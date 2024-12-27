import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day11Input = Map<number, number>;

export class Day11Challenge extends Challenge<Day11Input> {
  DAY = 11;

  protected runWithInput(input: Day11Input): ChallengeSolution {
    const after25Blinks = this.repeatBlink(input, 25);
    const after75Blinks = this.repeatBlink(after25Blinks, 50);
    return {
      part1: ['After 25 Blinks', this.countStones(after25Blinks)],
      part2: ['After 75 Blinks', this.countStones(after75Blinks)],
    };
  }

  protected countStones(stones: Day11Input): number {
    return Array.from(stones.values()).reduce((acc, count) => acc + count, 0);
  }

  protected repeatBlink(input: Day11Input, blinkNumber: number): Day11Input {
    let result: Day11Input = input;
    for (let i = 0; i < blinkNumber; i++) {
      result = this.doBlink(result);
    }
    return result;
  }

  protected doBlink(oldStones: Day11Input): Day11Input {
    const newStones = new Map<number, number>();

    for (const [stone, count] of oldStones.entries()) {
      if (stone === 0) {
        newStones.set(1, (newStones.get(1) || 0) + count);
      } else if (stone.toString().length % 2 === 0) {
        const stoneStr = stone.toString();
        const halfLength = stoneStr.length / 2;
        const newStoneA = parseInt(stoneStr.slice(0, halfLength));
        const newStoneB = parseInt(stoneStr.slice(halfLength));
        newStones.set(newStoneA, (newStones.get(newStoneA) || 0) + count);
        newStones.set(newStoneB, (newStones.get(newStoneB) || 0) + count);
      } else {
        const newStone = stone * 2024;
        newStones.set(newStone, (newStones.get(newStone) || 0) + count);
      }
    }

    return newStones;
  }

  protected parseInput(input: string): Day11Input {
    const stoneByNumber = new Map<number, number>();
    input.split(' ').forEach((str) => {
      const stone = parseInt(str);
      stoneByNumber.set(stone, (stoneByNumber.get(stone) || 0) + 1);
    });

    return stoneByNumber;
  }
}

new Day11Challenge().run({ logging: true });
