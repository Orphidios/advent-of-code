import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Direction = '^' | 'v' | '<' | '>';
type Day15Input = {
  robotInstructions: Direction[];
  warehouseGrid: string[][];
};

const INSTRUCTION_MAP: Record<Direction, { dx: number; dy: number }> = {
  ['^']: { dx: 0, dy: -1 },
  ['v']: { dx: 0, dy: 1 },
  ['<']: { dx: -1, dy: 0 },
  ['>']: { dx: 1, dy: 0 },
};

export class Day15Challenge extends Challenge<Day15Input> {
  DAY = 15;
  wharehouse: Wharehouse;

  protected runWithInput(input: Day15Input): ChallengeSolution {
    const gpsSumPart1 = this.runPart1(input);
    const gpsSumPart2 = this.runPart2(input);
    return {
      part1: ["Sum of all box' GPS coordinate", gpsSumPart1],
      part2: ["Sum of all box' GPS coordinate", gpsSumPart2],
    };
  }

  protected runPart1({ warehouseGrid, robotInstructions }: Day15Input): number {
    const wharehouse = new Wharehouse(warehouseGrid);
    for (const instruction of robotInstructions) {
      wharehouse.moveRobot(instruction);
    }
    return wharehouse.calculaeGpsSum();
  }

  protected runPart2({ warehouseGrid, robotInstructions }: Day15Input): number {
    const wharehouse = new Wharehouse(warehouseGrid).scaleUp();
    for (const instruction of robotInstructions) {
      wharehouse.moveRobot(instruction);
    }
    return wharehouse.calculaeGpsSum();
  }

  protected parseInput(input: string): Day15Input {
    const [wharehouse, orders] = input.split('\n\n');
    const robotInstructions = orders
      .split('')
      .filter((c) => c !== '\n') as Direction[];
    const warehouseGrid = wharehouse.split('\n').map((row) => row.split(''));
    return { robotInstructions, warehouseGrid };
  }
}

class Wharehouse {
  private robotPosition: { x: number; y: number };

  constructor(public grid: string[][]) {
    this.robotPosition = this.findRobotPosition();
    this.grid = grid.map((row) => [...row]);
  }

  public scaleUp(): Wharehouse {
    this.grid = this.grid.map((row) =>
      row.flatMap((cell) => {
        switch (cell) {
          case '#':
            return ['#', '#'];
          case '.':
            return ['.', '.'];
          case '@':
            return ['@', '.'];
          case 'O':
            return ['[', ']'];
        }
      }),
    );
    this.robotPosition = this.findRobotPosition();
    return this;
  }

  public calculaeGpsSum(): number {
    return this.grid.reduce((acc, row, y) => {
      return (
        acc +
        row.reduce((acc, cell, x) => {
          return acc + (['O', '['].includes(cell) ? y * 100 + x : 0);
        }, 0)
      );
    }, 0);
  }

  public moveRobot(direction: Direction): void {
    const { x, y } = this.robotPosition;
    const { dx, dy } = INSTRUCTION_MAP[direction];
    if (this.canMove(x, y, direction)) {
      this.moveObject(x, y, direction);
      this.robotPosition.x += dx;
      this.robotPosition.y += dy;
    }
  }

  private canMove(x: number, y: number, direction: Direction): boolean {
    const currentCell = this.grid[y][x];
    if (['^', 'v'].includes(direction) && ['[', ']'].includes(currentCell)) {
      const offset = currentCell === '[' ? 1 : -1;
      return (
        this.canMoveOneObject(x, y, direction) &&
        this.canMoveOneObject(x + offset, y, direction)
      );
    }
    return this.canMoveOneObject(x, y, direction);
  }

  private canMoveOneObject(
    x: number,
    y: number,
    direction: Direction,
  ): boolean {
    const { dx, dy } = INSTRUCTION_MAP[direction];
    const newCell = this.grid[y + dy][x + dx];
    if (newCell === '#') return false;
    return newCell === '.' || this.canMove(x + dx, y + dy, direction);
  }

  private moveObject(x: number, y: number, direction: Direction): void {
    const currentCell = this.grid[y][x];
    if (['^', 'v'].includes(direction) && ['[', ']'].includes(currentCell)) {
      const offset = currentCell === '[' ? 1 : -1;
      this.moveOneObject(x + offset, y, direction);
    }
    this.moveOneObject(x, y, direction);
  }

  private moveOneObject(x: number, y: number, direction: Direction): void {
    const { dx, dy } = INSTRUCTION_MAP[direction];
    const newCell = this.grid[y + dy][x + dx];
    if (['O', ']', '['].includes(newCell)) {
      this.moveObject(x + dx, y + dy, direction);
    }
    this.grid[y + dy][x + dx] = this.grid[y][x];
    this.grid[y][x] = '.';
  }

  private findRobotPosition(): { x: number; y: number } {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (this.grid[y][x] === '@') return { x, y };
      }
    }
    throw new Error('Robot position not found');
  }
}

new Day15Challenge().run({ logging: true });
