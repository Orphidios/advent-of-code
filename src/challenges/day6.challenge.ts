import { Challenge } from '../common/challenge.class.js';

type Day6Input = string[];

export class Day6Challenge extends Challenge<Day6Input> {
  DAY = 6;
  DIRECTIONS: [number, number, number, number]; // Up, Right, Down, Left

  protected runWithInput(input: Day6Input): void {
    const result = this.doStep(input, input.indexOf('^'), 0);
    const xCount = result.filter((char) => char === 'X').length;
    console.log('Number of distinct position :', xCount);
  }

  protected doStep(input: Day6Input, index: number, dir: number): Day6Input {
    const offset = this.DIRECTIONS[dir];
    input[index] = 'X';
    switch (input[index + offset]) {
      case '.':
      case 'X':
        return this.doStep(input, index + offset, dir);
      case '#':
        return this.doStep(input, index, (dir + 1) % 4);
      case '\n':
      case undefined:
        return input;
    }
  }

  protected parseInput(input: string): Day6Input {
    const verticalOffset = input.split('\n')[0].length + 1;
    this.DIRECTIONS = [-verticalOffset, 1, verticalOffset, -1];
    return input.split('');
  }
}

new Day6Challenge().run({ logging: true });
