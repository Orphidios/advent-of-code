import { InputFileHelper } from '../helpers/input-file-helper.js';

type ChallengeOptions = {
  logging?: boolean;
};

export type ChallengeSolution = {
  part1: [string, number];
  part2: [string, number];
};

export abstract class Challenge<InputType> {
  abstract DAY: number;

  public run(options: ChallengeOptions = {}): void {
    console.log(`\nDay ${this.DAY}`);
    const startTime = performance.now();
    const rawInput: string = InputFileHelper.readDayInputFile(this.DAY);
    const solution = this.runWithInput(this.parseInput(rawInput));
    const endTime = performance.now();
    if (solution) {
      console.log(`\n PART 1 - ${solution.part1[0]}:`, solution.part1[1]);
      console.log(` PART 2 - ${solution.part2[0]}:`, solution.part2[1]);
    }
    if (options.logging)
      console.log(`\n Execution time: ${endTime - startTime} milliseconds`);
  }

  protected abstract runWithInput(input: InputType): ChallengeSolution | void;

  protected abstract parseInput(input: string): InputType;
}
