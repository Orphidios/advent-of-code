import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day5Input = {
  rules: [number, number][];
  updates: number[][];
};

export class Day5Challenge extends Challenge<Day5Input> {
  DAY = 5;

  protected runWithInput(input: Day5Input): ChallengeSolution {
    const validUpdates = input.updates.filter((update) =>
      this.isValidUpdate(update, input.rules),
    );

    const invalidUpdates = input.updates.filter(
      (update) => !this.isValidUpdate(update, input.rules),
    );

    const middlePagesSumValid = validUpdates.reduce(
      (sum, update) => sum + this.getMiddlePage(update),
      0,
    );

    const reorderedUpdates = invalidUpdates.map((update) =>
      this.reorderUpdate(update, input.rules),
    );

    const middlePagesSumInvalid = reorderedUpdates.reduce(
      (sum, update) => sum + this.getMiddlePage(update),
      0,
    );

    return {
      part1: ['Sum of middle pages (valid updates)', middlePagesSumValid],
      part2: ['Sum of middle pages (reordered updates)', middlePagesSumInvalid],
    };
  }

  protected parseInput(input: string): Day5Input {
    const [rulesSection, updatesSection] = input.split('\n\n');
    const rules = rulesSection
      .split('\n')
      .map((line) => line.split('|').map(Number) as [number, number]);
    const updates = updatesSection
      .split('\n')
      .map((line) => line.split(',').map(Number));
    return { rules, updates };
  }

  private isValidUpdate(update: number[], rules: [number, number][]): boolean {
    const positionMap = new Map<number, number>();
    update.forEach((page, index) => positionMap.set(page, index));
    return rules.every(([before, after]) => {
      if (positionMap.has(before) && positionMap.has(after)) {
        return positionMap.get(before)! < positionMap.get(after)!;
      }
      return true;
    });
  }

  private reorderUpdate(update: number[], rules: [number, number][]): number[] {
    const graph = new Map<number, number[]>();
    const inDegree = new Map<number, number>();

    update.forEach((page) => {
      graph.set(page, []);
      inDegree.set(page, 0);
    });

    rules.forEach(([before, after]) => {
      if (graph.has(before) && graph.has(after)) {
        graph.get(before).push(after);
        inDegree.set(after, inDegree.get(after) + 1);
      }
    });

    const queue: number[] = [];
    inDegree.forEach((degree, page) => {
      if (degree === 0) queue.push(page);
    });

    const sorted: number[] = [];
    while (queue.length > 0) {
      const page = queue.shift()!;
      sorted.push(page);
      graph.get(page)!.forEach((next) => {
        inDegree.set(next, inDegree.get(next)! - 1);
        if (inDegree.get(next) === 0) queue.push(next);
      });
    }

    return sorted;
  }

  private getMiddlePage(update: number[]): number {
    const middleIndex = Math.floor(update.length / 2);
    return update[middleIndex];
  }
}

new Day5Challenge().run({ logging: true });
