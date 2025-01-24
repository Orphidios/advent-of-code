import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day19Input = {
  patterns: string[];
  targets: string[];
};

export class Day19Challenge extends Challenge<Day19Input> {
  DAY = 19;

  protected runWithInput(input: Day19Input): ChallengeSolution {
    const { patterns, targets } = input as Day19Input;

    const validTargetCount = this.countValidCombinationsWithRegEx(
      patterns,
      targets,
    );

    const sumOfCombinations = targets
      .map((c) => this.calculateCombinations(c, patterns))
      .reduce((sum, r) => sum + r, 0);

    return {
      part1: ['Number of valid target', validTargetCount],
      part2: ['Sum of combinations', sumOfCombinations],
    };
  }

  protected countValidCombinationsWithRegEx(
    patterns: string[],
    combinations: string[],
  ): number {
    const sortedPatterns = patterns.sort((a, b) => a.length - b.length);
    const regexPattern = sortedPatterns.reduce((regex, el) => {
      if (!regex) return `^(${el})*$`;
      if (new RegExp(regex).test(el)) {
        return regex;
      }
      return `^(${regex.slice(2, -3)}|${el})*$`;
    }, null);

    const regex = new RegExp(regexPattern);
    const validPatterns = combinations.filter((pattern) => regex.test(pattern));
    return validPatterns.length;
  }

  protected calculateCombinations(target: string, patterns: string[]): number {
    const dp = Array(target.length + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= target.length; i++) {
      for (const pattern of patterns) {
        if (
          i >= pattern.length &&
          target.slice(i - pattern.length, i) === pattern
        ) {
          dp[i] += dp[i - pattern.length];
        }
      }
    }

    return dp[target.length];
  }

  protected parseInput(input: string): Day19Input {
    const lines = input.split('\n');
    const patterns = lines[0].split(', ').sort();
    const targets = lines.slice(2).filter((line) => line.trim() !== '');

    return {
      patterns,
      targets,
    };
  }
}

new Day19Challenge().run({ logging: true });
