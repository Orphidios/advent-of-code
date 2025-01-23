import { InputFileHelper } from '../helpers/input-file.helper.js';

type ChallengeOptions = {
  logging?: boolean;
};

export type ChallengeSolution = {
  part1: [string, number | string];
  part2: [string, number | string];
};

export abstract class Challenge<InputType> {
  abstract DAY: number;

  public run(options: ChallengeOptions = {}): void {
    console.log(`\n🗓️ Day ${this.DAY}`);

    const startTime = performance.now();
    const rawInput: string = InputFileHelper.readDayInputFile(this.DAY);
    if (!rawInput) return;

    const parsedInput = this.parseInput(rawInput);
    const solution = this.runWithInput(parsedInput);
    const endTime = performance.now();

    if (solution) {
      console.log(`\n 1️⃣ ${solution.part1[0]}:`, solution.part1[1]);
      console.log(` 2️⃣ ${solution.part2[0]}:`, solution.part2[1]);
    }

    if (options.logging) {
      const executionTime = (endTime - startTime).toFixed(2);
      console.log(`\n ⏱️ Execution time: ${executionTime} milliseconds`);
    }
  }

  protected abstract runWithInput(input: InputType): ChallengeSolution | void;

  protected abstract parseInput(input: string): InputType;
}
