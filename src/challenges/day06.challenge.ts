import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day6Input = string[][]; // Y, X
const DIRECTION_MAP_ORDER = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

export class Day6Challenge extends Challenge<Day6Input> {
  DAY = 6;
  private visitedPos: Map<string, Set<number>> = new Map();
  private obstructionPos: Set<string> = new Set();
  private grid: Day6Input;

  protected runWithInput(input: Day6Input): ChallengeSolution {
    this.grid = input;
    this.resolveGrid();
    return {
      part1: ['Nb of distinct visited pos', this.visitedPos.size],
      part2: ['Nb of valid obstructions pos', this.obstructionPos.size],
    };
  }

  protected resolveGrid(): void {
    this.visitedPos.clear();
    let [y, x] = this.findStart();
    let direction = 0;

    while (this.isWithinBounds(y, x)) {
      const positionKey = this.getPositionKey(y, x);
      if (!this.visitedPos.has(positionKey)) {
        this.visitedPos.set(positionKey, new Set());
      } else if (this.visitedPos.get(positionKey).has(direction)) {
        console.log('this is a loop');
        break;
      }
      this.visitedPos.get(positionKey).add(direction);

      const [dy, dx] = DIRECTION_MAP_ORDER[direction];
      if (this.grid[y + dy]?.[x + dx] === '#') {
        direction = (direction + 1) % 4;
      } else {
        this.checkObstruction(y, x, direction);
        y += dy;
        x += dx;
      }
    }
  }

  protected checkObstruction(y: number, x: number, direction: number): void {
    const [dy, dx] = DIRECTION_MAP_ORDER[direction];
    const [obsY, obsX] = [y + dy, x + dx];
    if (
      !this.isWithinBounds(obsY, obsX) ||
      this.visitedPos.has(this.getPositionKey(obsY, obsX))
    ) {
      return;
    }
    this.toogleObstruction(obsY, obsX);

    const localVisited = new Map<string, Set<number>>();
    this.visitedPos.forEach((value, key) => {
      localVisited.set(key, new Set(value));
    });

    let [currentY, currentX] = [y, x];
    let currentDir = (direction + 1) % 4;

    while (this.isWithinBounds(currentY, currentX)) {
      const positionKey = this.getPositionKey(currentY, currentX);
      if (!localVisited.has(positionKey)) {
        localVisited.set(positionKey, new Set());
      } else if (localVisited.get(positionKey).has(currentDir)) {
        this.obstructionPos.add(this.getPositionKey(obsY, obsX));
        break;
      }
      localVisited.get(positionKey).add(currentDir);

      const [dy, dx] = DIRECTION_MAP_ORDER[currentDir];
      if (this.grid[currentY + dy]?.[currentX + dx] === '#') {
        currentDir = (currentDir + 1) % 4;
      } else {
        currentY += dy;
        currentX += dx;
      }
    }

    this.toogleObstruction(obsY, obsX);
  }

  protected toogleObstruction(y, x): void {
    this.grid[y][x] = this.grid[y][x] === '#' ? '.' : '#';
  }

  protected getPositionKey(y: number, x: number): string {
    return `${y},${x}`;
  }

  protected findStart(): [number, number] {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] === '^') {
          return [i, j];
        }
      }
    }
    throw new Error('Start position not found');
  }

  protected isWithinBounds(y: number, x: number): boolean {
    return y >= 0 && y < this.grid.length && x >= 0 && x < this.grid[0].length;
  }

  protected parseInput(input: string): Day6Input {
    return input.split('\n').map((line) => line.split(''));
  }
}

new Day6Challenge().run({ logging: true });
