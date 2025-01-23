import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Position = [number, number];
type Day18Input = Position[];

export class Day18Challenge extends Challenge<Day18Input> {
  DAY = 18;
  START: Position = [0, 0];
  END: Position = [70, 70];

  protected runWithInput(obstacles: Day18Input): ChallengeSolution {
    const initialObstacles = obstacles.slice(0, 1024);

    const intialPathLength = this.findShortestPath(initialObstacles);
    const blockingObstacle = this.getFirstBlockingObstacle(obstacles);

    return {
      part1: ['Shortest path length', intialPathLength],
      part2: ['First blocking obstacle', blockingObstacle.join(',')],
    };
  }

  protected getFirstBlockingObstacle(obstacles: Position[]): Position {
    const initialObstacles = obstacles.slice(0, 1024);
    const remainingObstacles = obstacles.slice(1024);

    let left = 0;
    let right = remainingObstacles.length - 1;
    let blockingIndex = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const currentObstacles = initialObstacles.concat(
        remainingObstacles.slice(0, mid + 1),
      );

      if (this.findShortestPath(currentObstacles) === -1) {
        blockingIndex = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return remainingObstacles[blockingIndex];
  }

  protected heuristic(a: Position, b: Position): number {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
  }

  protected getNeighbors([x, y]: Position): Position[] {
    return [
      [x - 1, y] as Position,
      [x + 1, y] as Position,
      [x, y - 1] as Position,
      [x, y + 1] as Position,
    ].filter(([nx, ny]) => nx >= 0 && nx < 71 && ny >= 0 && ny < 71);
  }

  protected findShortestPath(obstacles: Position[]): number {
    const start = this.START;
    const end = this.END;
    const obstacleSet = new Set(obstacles.map((pos) => pos.toString()));
    const openSet = new Set<string>([start.toString()]);
    const cameFrom = new Map<string, string>();
    const gScore = new Map<string, number>([[start.toString(), 0]]);
    const fScore = new Map<string, number>([
      [start.toString(), this.heuristic(start, end)],
    ]);

    while (openSet.size > 0) {
      let current: Position | null = null;
      let currentFScore = Infinity;

      for (const pos of openSet) {
        const posFScore = fScore.get(pos) ?? Infinity;
        if (posFScore < currentFScore) {
          currentFScore = posFScore;
          current = pos.split(',').map(Number) as Position;
        }
      }

      if (current === null) break;
      if (current[0] === end[0] && current[1] === end[1]) {
        let pathLength = 0;
        let temp = current.toString();
        while (cameFrom.has(temp)) {
          pathLength++;
          temp = cameFrom.get(temp)!;
        }
        return pathLength;
      }

      openSet.delete(current.toString());

      for (const neighbor of this.getNeighbors(current)) {
        if (obstacleSet.has(neighbor.toString())) continue;

        const tentativeGScore =
          (gScore.get(current.toString()) ?? Infinity) + 1;

        if (tentativeGScore < (gScore.get(neighbor.toString()) ?? Infinity)) {
          cameFrom.set(neighbor.toString(), current.toString());
          gScore.set(neighbor.toString(), tentativeGScore);
          fScore.set(
            neighbor.toString(),
            tentativeGScore + this.heuristic(neighbor, end),
          );
          if (!openSet.has(neighbor.toString())) {
            openSet.add(neighbor.toString());
          }
        }
      }
    }

    return -1;
  }

  protected parseInput(input: string): Day18Input {
    return input
      .split('\n')
      .map((line) => line.split(',').map(Number) as Position);
  }
}

new Day18Challenge().run({ logging: true });
