import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day1Input = {
  leftList: number[];
  rightList: number[];
};

class Day1Challenge extends Challenge<Day1Input> {
  DAY = 1;

  protected runWithInput(input: Day1Input): ChallengeSolution {
    return {
      part1: [
        'Distance between list',
        this.distanceBetweenList(input.leftList, input.rightList),
      ],
      part2: [
        'Similarity between list',
        this.similarityBetweenList(input.leftList, input.rightList),
      ],
    };
  }

  protected parseInput(input: string): Day1Input {
    return input
      .split('\n')
      .filter((line) => line !== '')
      .reduce(
        (acc: Day1Input, line) => {
          const [left, right] = line.split('  ').map(Number);
          acc.leftList.push(left);
          acc.rightList.push(right);
          return acc;
        },
        { leftList: [], rightList: [] },
      );
  }

  protected distanceBetweenList(listA: number[], listB: number[]): number {
    const sortedLeftList = [...listA].sort((a, b) => a - b);
    const sortedRightList = [...listB].sort((a, b) => a - b);
    return sortedLeftList.reduce(
      (acc, current, index) => acc + Math.abs(current - sortedRightList[index]),
      0,
    );
  }

  protected similarityBetweenList(
    leftList: number[],
    rightList: number[],
  ): number {
    const referenceList = this.countUnique(rightList);
    return leftList.reduce(
      (acc, value) =>
        acc + (referenceList[value] ? value * referenceList[value] : 0),
      0,
    );
  }

  protected countUnique(arrayToCount: number[]): { [key: number]: number } {
    return arrayToCount.reduce(
      (acc: { [key: number]: number }, element: number) => {
        acc[element] = (acc[element] || 0) + 1;
        return acc;
      },
      {},
    );
  }
}

new Day1Challenge().run({ logging: true });
