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
      console.log(`Execution time: ${endTime - startTime} milliseconds`);
  }

  protected runWithInput(input: InputType): void {
    throw new Error('Method not implemented.');
  }

  protected parseInput(input: string): InputType {
    throw new Error('Method not implemented.');
  }
}
