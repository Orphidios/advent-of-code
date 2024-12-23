import { Challenge } from '../common/challenge.class.js';

type Day6Input = string[][]; // Y, X
const DIRECTION_MAP_ORDER = [
  [-1, 0], // up
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
];

export class Day6Challenge extends Challenge<Day6Input> {
  DAY = 6;
  private visited: Map<string, Set<number>> = new Map();

  protected runWithInput(input: Day6Input): void {
    const uniquePositionCount = this.getNumberOfUniquePositions(input);
    console.log('Number of distinct positions:', uniquePositionCount);
  }

  protected getNumberOfUniquePositions(grid: Day6Input): number {
    this.visited.clear();
    let [y, x] = this.findStart(grid);
    let direction = 0;

    while (this.isWithinBounds(y, x, grid)) {
      const positionKey = this.getPositionKey(y, x);
      if (!this.visited.has(positionKey)) {
        this.visited.set(positionKey, new Set());
      }
      this.visited.get(positionKey).add(direction);

      const [dy, dx] = DIRECTION_MAP_ORDER[direction];
      if (grid[y + dy]?.[x + dx] === '#') {
        direction = (direction + 1) % 4;
      } else {
        y += dy;
        x += dx;
      }
    }

    return this.visited.size;
  }

  protected getPositionKey(y: number, x: number): string {
    return `${y},${x}`;
  }

  protected findStart(grid: string[][]): [number, number] {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '^') {
          return [i, j];
        }
      }
    }
    throw new Error('Start position not found');
  }

  protected isWithinBounds(y: number, x: number, grid: Day6Input): boolean {
    return y >= 0 && y < grid.length && x >= 0 && x < grid[0].length;
  }

  protected parseInput(input: string): Day6Input {
    return input.split('\n').map((line) => line.split(''));
  }
}

new Day6Challenge().run({ logging: true });
