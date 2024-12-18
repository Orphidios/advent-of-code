import { InputFileHelper } from "../helpers/input-file-helper.js";

export abstract class Challenge<InputType> {
    abstract DAY: number;

    public run(): void {
        const rawInput: string = InputFileHelper.readDayInputFile(this.DAY);
        this.runWithInput(this.parseInput(rawInput));
    };

    protected runWithInput(input: InputType): void {
        throw new Error('Method not implemented.');
    };

    protected parseInput(input: string): InputType {
        throw new Error('Method not implemented.');
    };
}