import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day10Input = number[][];
type Position = [number, number];

export class Day10Challenge extends Challenge<Day10Input> {
  DAY = 10;
  MAX_X: number;
  MAX_Y: number;

  protected runWithInput(input: Day10Input): ChallengeSolution {
    const [totalScore, totalRating] = this.findTrailheads(input)
      .map((trailhead) => this.analyzeTrailheadPaths(input, trailhead))
      .reduce(
        ([totalScore, totalRating], { score, rating }) => [
          totalScore + score,
          totalRating + rating,
        ],
        [0, 0],
      );
    return {
      part1: ['Final score', totalScore],
      part2: ['Final rating', totalRating],
    };
  }

  protected findTrailheads(map: Day10Input): Position[] {
    const trailheads: Position[] = [];
    for (let y = 0; y < this.MAX_Y; y++) {
      for (let x = 0; x < this.MAX_X; x++) {
        if (map[y][x] === 0) {
          trailheads.push([x, y]);
        }
      }
    }
    return trailheads;
  }

  protected analyzeTrailheadPaths(
    map: Day10Input,
    trailhead: Position,
  ): { score: number; rating: number } {
    let positions: Position[] = [trailhead];
    for (let i = 1; i <= 9; i++) {
      positions = positions.flatMap((pos) =>
        this.findAdjacentPaths(pos).filter(
          ([adjX, adjY]) => map[adjY][adjX] === i,
        ),
      );
    }

    const uniquePositions = new Set(positions.map(([x, y]) => `${x},${y}`));
    return {
      score: uniquePositions.size,
      rating: positions.length,
    };
  }

  protected findAdjacentPaths([x, y]: Position): Position[] {
    const adjacentPositions: Position[] = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    return adjacentPositions.filter((pos) => this.isWithinBounds(pos));
  }

  protected isWithinBounds([x, y]: Position): boolean {
    return x >= 0 && x < this.MAX_X && y >= 0 && y < this.MAX_Y;
  }

  protected parseInput(input: string): Day10Input {
    const parsedInput = input
      .split('\n')
      .map((line) => line.split('').map(Number));
    this.MAX_X = parsedInput[0].length;
    this.MAX_Y = parsedInput.length;
    return parsedInput;
  }
}

new Day10Challenge().run({ logging: true });
