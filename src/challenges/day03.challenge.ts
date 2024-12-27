import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Command =
  | { instruction: 'do()' | "don't()" }
  | { instruction: 'mul'; numbers: [number, number] };
type Day3Input = Command[];

export class Day3Challenge extends Challenge<Day3Input> {
  DAY = 3;

  protected runWithInput(input: Day3Input): ChallengeSolution {
    return {
      part1: ['Multiply and sum', this.multiplyAndSum(input)],
      part2: ['Muliply and sum if enabled', this.muliplyAndSumIfEnabled(input)],
    };
  }

  protected multiplyAndSum(input: Day3Input): number {
    return input.reduce((acc, cmd) => {
      if (cmd.instruction === 'mul') {
        return acc + cmd.numbers[0] * cmd.numbers[1];
      }
      return acc;
    }, 0);
  }

  protected muliplyAndSumIfEnabled(input: Day3Input): number {
    let enabled = true;
    return input.reduce((acc, cmd) => {
      if (cmd.instruction === 'mul') {
        return acc + (enabled ? cmd.numbers[0] * cmd.numbers[1] : 0);
      }
      enabled = cmd.instruction === 'do()';
      return acc;
    }, 0);
  }

  protected parseInput(input: string): Day3Input {
    const regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...input.matchAll(regex)];
    const parsedMatches = matches.map((match) => {
      if (match[1] && match[2]) {
        return {
          instruction: 'mul',
          numbers: [parseInt(match[1], 10), parseInt(match[2], 10)],
        };
      }
      return { instruction: match[0] };
    });
    return parsedMatches as Day3Input;
  }
}

new Day3Challenge().run({ logging: true });
