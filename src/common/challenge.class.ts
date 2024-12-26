import { InputFileHelper } from '../helpers/input-file-helper.js';

type ChallengeOptions = {
  logging?: boolean;
};

export abstract class Challenge<InputType> {
  abstract DAY: number;

  public run(options: ChallengeOptions = {}): void {
    const startTime = performance.now();
    const rawInput: string = InputFileHelper.readDayInputFile(this.DAY);
    this.runWithInput(this.parseInput(rawInput));
    const endTime = performance.now();
    if (options.logging)
      console.log(`\nExecution time: ${endTime - startTime} milliseconds`);
  }

  protected abstract runWithInput(input: InputType): void;

  protected abstract parseInput(input: string): InputType;
}
