import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day17Input = {
  registerA: number;
  program: number[];
};

export class Day17Challenge extends Challenge<Day17Input> {
  DAY = 17;

  protected runWithInput(input: Day17Input): ChallengeSolution {
    const { registerA, program } = input;
    const outputFromProgram = this.myProgram(registerA);
    const bestStartingValue = this.findStartingValueForProgram(program);

    return {
      part1: ['Output from my program', outputFromProgram],
      part2: ['Best program replication starting value', bestStartingValue],
    };
  }

  protected myProgram(aRegister: number): string {
    let a = aRegister;
    let b = 0;
    const result = [];

    while (a !== 0) {
      const newA = Math.floor(a / 8);
      b = a % 8 ^ 1 ^ Math.floor(a / 2 ** (a % 8 ^ 1)) ^ 6;
      a = newA;
      result.push(b % 8);
    }

    return result.join(',');
  }

  protected findStartingValueForProgram(program: number[]): string {
    const [, value] = this.doStep(0n, program.length - 1, program.map(BigInt));
    return String(value);
  }

  protected validValues(finalA: bigint, output: bigint): bigint[] {
    return [0n, 1n, 2n, 3n, 4n, 5n, 6n, 7n]
      .map((x) => x + 8n * finalA)
      .filter((x) => x > 0)
      .filter(
        (value) =>
          (value % 8n ^ 1n ^ (value / 2n ** (value % 8n ^ 1n)) ^ 6n) % 8n ===
          output,
      );
  }

  public doStep(
    finalA: bigint,
    index: number,
    outputs: bigint[],
  ): [boolean, bigint] {
    if (index < 0) return [true, finalA]; // End of the program

    const initialValues = this.validValues(finalA, outputs[index]);
    if (initialValues.length === 0) return [false, 0n]; // Dead end

    for (const value of initialValues) {
      const [valid, nextValue] = this.doStep(value, index - 1, outputs);
      if (valid) return [true, nextValue];
    }

    return [false, 0n];
  }

  protected parseInput(input: string): Day17Input {
    const lines = input.split('\n');
    const aRegisterLine = lines.find((line) => line.startsWith('Register A:'));
    const programLine = lines.find((line) => line.startsWith('Program:'));

    const startingARegisterValue = aRegisterLine
      ? parseInt(aRegisterLine.split(': ')[1], 10)
      : 0;
    const program = programLine
      ? programLine.split(': ')[1].split(',').map(Number)
      : [];

    return {
      registerA: startingARegisterValue,
      program,
    };
  }
}

new Day17Challenge().run({ logging: true });
