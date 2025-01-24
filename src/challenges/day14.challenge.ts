import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Point = [number, number];
type Robot = { startingPos: Point; velocity: Point };
type Day14Input = Robot[];

export class Day14Challenge extends Challenge<Day14Input> {
  DAY = 14;
  MAX_WIDTH = 101;
  MAX_HEIGHT = 103;

  protected runWithInput(robots: Day14Input): ChallengeSolution {
    const safetyFactor = this.safetyFactorAfter100Seconds(robots);
    const numberOfSeconds = this.findIterationForTreeInGrid(robots);
    return {
      part1: ['Safety factor', safetyFactor],
      part2: ['Number of seconds for tree to appear', numberOfSeconds],
    };
  }

  protected safetyFactorAfter100Seconds(robots: Robot[]): number {
    const points = robots.map((robot) =>
      this.calculatePositionAfterXSeconds(robot, 100),
    );
    return this.numberByQuadrants(points).reduce(
      (acc, count) => acc * count,
      1,
    );
  }

  protected findIterationForTreeInGrid(robots: Robot[]): number {
    for (let i = 1; i <= 100000; i++) {
      const points = robots.map((robot) =>
        this.calculatePositionAfterXSeconds(robot, i),
      );
      if (this.hasTreeInGrid(points)) {
        // this.printPoints(points);
        return i;
      }
    }
    return -1;
  }

  protected hasTreeInGrid(points: Point[]): boolean {
    const grid = Array.from({ length: this.MAX_HEIGHT }, () =>
      Array.from({ length: this.MAX_WIDTH }).fill(false),
    );

    points.forEach(([x, y]) => {
      grid[y][x] = true;
    });

    for (const [x, y] of points) {
      let patternFound = true;
      for (let dy = 0; dy < 3; dy++) {
        for (let dx = 0; dx < 3; dx++) {
          if (!grid?.[y + dy]?.[x + dx]) {
            patternFound = false;
            break;
          }
        }
        if (!patternFound) break;
      }
      if (patternFound) return true;
    }

    return false;
  }

  protected printPoints(points: Point[]): void {
    const grid = Array.from({ length: this.MAX_HEIGHT }, () =>
      Array.from({ length: this.MAX_WIDTH }).fill(' '),
    );

    points.forEach(([x, y]) => {
      grid[y][x] = 'X';
    });

    console.log(grid.map((row) => row.join('')).join('\n'));
  }

  protected numberByQuadrants(
    points: Point[],
  ): [number, number, number, number] {
    const midX = Math.floor(this.MAX_WIDTH / 2);
    const midY = Math.floor(this.MAX_HEIGHT / 2);

    return points.reduce(
      (acc, [x, y]) => {
        if (x < midX && y < midY) {
          acc[0]++;
        } else if (x > midX && y < midY) {
          acc[1]++;
        } else if (x < midX && y > midY) {
          acc[2]++;
        } else if (x > midX && y > midY) {
          acc[3]++;
        }
        return acc;
      },
      [0, 0, 0, 0] as [number, number, number, number],
    );
  }

  protected calculatePositionAfterXSeconds(
    robot: Robot,
    seconds: number,
  ): Point {
    const [px, py] = robot.startingPos;
    const [vx, vy] = robot.velocity;
    const newX =
      (((px + vx * seconds) % this.MAX_WIDTH) + this.MAX_WIDTH) %
      this.MAX_WIDTH;
    const newY =
      (((py + vy * seconds) % this.MAX_HEIGHT) + this.MAX_HEIGHT) %
      this.MAX_HEIGHT;
    return [newX, newY];
  }

  protected parseInput(input: string): Day14Input {
    return input
      .trim()
      .split('\n')
      .map((line) => {
        const [p, v] = line.split(' ');
        const [px, py] = p.slice(2).split(',').map(Number);
        const [vx, vy] = v.slice(2).split(',').map(Number);
        return { startingPos: [px, py] as Point, velocity: [vx, vy] as Point };
      });
  }
}

new Day14Challenge().run({ logging: true });
