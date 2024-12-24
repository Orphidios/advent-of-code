import { Challenge } from '../common/challenge.class.js';

type Equation = {
  targetValue: number;
  operands: number[];
};

type Day7Input = Equation[];

export class Day7Challenge extends Challenge<Day7Input> {
  DAY = 7;

  protected runWithInput(input: Day7Input): void {
    const resultPart1 = this.calculateSum(input, false);
    console.log('Sum of solution values with + and *:', resultPart1);

    const resultPart2 = this.calculateSum(input, true);
    console.log('Sum of solution values with +, * and ||:', resultPart2);
  }

  private calculateSum(input: Day7Input, withConcatOperator: boolean): number {
    return input.reduce((acc, equation) => {
      return (
        acc +
        (this.hasSolution(equation, withConcatOperator)
          ? equation.targetValue
          : 0)
      );
    }, 0);
  }

  protected hasSolution(
    equation: Equation,
    withConcatOperator: boolean = false,
  ): boolean {
    const values = equation.operands.reduce((acc, operand) => {
      if (acc.length === 0) {
        return [operand];
      }
      const newValues = [
        ...acc.map((accValue) => accValue + operand),
        ...acc.map((accValue) => accValue * operand),
      ];
      if (withConcatOperator) {
        newValues.push(
          ...acc.map((accValue) => parseInt(accValue + '' + operand)),
        );
      }
      return newValues;
    }, []);
    return values.includes(equation.targetValue);
  }

  protected parseInput(input: string): Day7Input {
    console.log('Raw input file for day 7', input);
    return input
      .split('\n')
      .filter((line) => line.length > 0)
      .map((line) => {
        const [testValue, numbers] = line.split(': ');
        return {
          targetValue: parseInt(testValue),
          operands: numbers.split(' ').map(Number),
        };
      });
  }
}

new Day7Challenge().run({ logging: true });
