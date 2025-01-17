import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Grid = string[][];
type Position = [number, number];
type Direction = 'north' | 'east' | 'south' | 'west';
type Day16Input = Grid;

const DIRECTION_MAP: Record<Direction, Position> = {
  north: [-1, 0],
  east: [0, 1],
  south: [1, 0],
  west: [0, -1],
};

const TURN_MAP: Record<Direction, [Direction, Direction]> = {
  north: ['west', 'east'],
  east: ['north', 'south'],
  south: ['east', 'west'],
  west: ['south', 'north'],
};

export class Day16Challenge extends Challenge<Day16Input> {
  DAY = 16;

  protected runWithInput(input: Day16Input): ChallengeSolution {
    const { bestWeight, visitedBy } = this.searchBestPath(input);
    return {
      part1: ['Best weight possible', bestWeight],
      part2: ['Sum of all valid visited cells', visitedBy],
    };
  }

  protected searchBestPath(grid: Grid): {
    bestWeight: number;
    visitedBy: number;
  } {
    const [start, end] = this.findStartAndEnd(grid);
    new SearchHead(start, 'east', 0);

    while (SearchHead.weightMap.get(end.join(',')) === undefined) {
      SearchHead.getLowestWeightHead().processHead(grid);
    }

    const head = SearchHead.visitByMap.get(end.join(','))[0];
    // this.printMap(grid, head);
    return { bestWeight: head.weight, visitedBy: head.visited.size };
  }

  protected findStartAndEnd(grid: Day16Input): [Position, Position] {
    let start: Position | null = null;
    let end: Position | null = null;

    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 'S') start = [y, x];
        if (cell === 'E') end = [y, x];
      });
    });

    if (!start || !end)
      throw new Error('Start or End position not found in the map');

    return [start, end];
  }

  protected parseInput(input: string): Day16Input {
    return input.split('\n').map((line) => line.split(''));
  }

  protected printMap(grid: Grid, givenHead?: SearchHead): void {
    const head = givenHead || SearchHead.getLowestWeightHead();

    const getHeadNumber = (z: number): string =>
      z % 10 === 0 ? `\x1b[31m${Math.floor(z / 10) % 10}\x1b[0m` : `${z % 10}`;

    const getCellWithColor = (cell: string): string => {
      if (cell === '.') return ' ';
      return `\x1b[30m${cell}\x1b[0m`;
    };

    const formatCell = (cell: string, y: number, x: number): string => {
      if (y === 0) return getHeadNumber(x);
      if (x === 0) return getHeadNumber(y);
      return head.visited.has(`${y},${x}`)
        ? `\x1b[32mO\x1b[0m`
        : getCellWithColor(cell);
    };

    grid.forEach((row, y) => {
      console.log(row.map((cell, x) => formatCell(cell, y, x)).join(''));
    });
  }
}

class SearchHead {
  static entities: SearchHead[] = [];
  static visitByMap: Map<string, Array<SearchHead>> = new Map();
  static weightMap: Map<string, number> = new Map();

  public static updateVisitedBy(head: SearchHead) {
    const key = head.position.join(',');
    const visitedBy = SearchHead.visitByMap.get(key);
    if (visitedBy) {
      visitedBy.push(head);
    } else {
      SearchHead.visitByMap.set(key, [head]);
    }
  }

  public static getLowestWeightHead(): SearchHead {
    return SearchHead.entities.sort((a, b) => a.weight - b.weight)[0];
  }

  visited: Set<string> = new Set();

  constructor(
    public position: Position,
    public direction: Direction,
    public weight: number,
  ) {
    this.visited.add(this.position.join(','));
    SearchHead.entities.push(this);
    SearchHead.updateVisitedBy(this);
  }

  public processHead(grid: Grid): void {
    const [leftDirection, rightDirection] = TURN_MAP[this.direction];
    this.turnIfPossible(grid, leftDirection);
    this.turnIfPossible(grid, rightDirection);
    this.moveForward(grid);
  }

  public turnIfPossible(grid: Grid, direction: Direction): void {
    const [newY, newX] = this.getNewPosition(direction);

    if (grid[newY][newX] === '#') return;

    const visitedBy = SearchHead.visitByMap.get([newY, newX].join(','));
    if (visitedBy?.filter((head) => head.direction === direction).length > 0)
      return;

    const newHead = new SearchHead(
      [this.position[0], this.position[1]],
      direction,
      this.weight + 1000,
    );
    newHead.visited = new Set(this.visited);
  }

  public moveForward(grid: Grid): void {
    const [newY, newX] = this.getNewPosition(this.direction);

    if (grid[newY][newX] === '#') {
      this.delete();
      return;
    }

    const visitedBy = SearchHead.visitByMap.get([newY, newX].join(','));

    const sameHead = visitedBy?.filter(
      ({ weight, direction }) =>
        weight === this.weight + 1 && direction === this.direction,
    )?.[0];
    if (sameHead) {
      sameHead.merge(this);
      return;
    }

    const betterHead = visitedBy?.filter(
      (head) =>
        head.direction === this.direction && head.weight < this.weight + 1,
    );
    if (betterHead?.length > 0) {
      this.delete();
      return;
    }

    this.weight += 1;
    this.position = [newY, newX];
    this.visited.add(this.position.join(','));
    SearchHead.updateVisitedBy(this);
    SearchHead.weightMap.set(this.position.join(','), this.weight);
  }

  public merge(head: SearchHead): void {
    this.visited = new Set([...this.visited, ...head.visited]);
    head.delete();
  }

  public delete(): void {
    SearchHead.entities = SearchHead.entities.filter(
      (entity) => entity !== this,
    );
  }

  private getNewPosition(direction: Direction): Position {
    const [dy, dx] = DIRECTION_MAP[direction];
    return [this.position[0] + dy, this.position[1] + dx];
  }
}

new Day16Challenge().run({ logging: true });
