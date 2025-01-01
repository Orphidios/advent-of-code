import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type ClawMachine = {
  buttonA: { dx: number; dy: number };
  buttonB: { dx: number; dy: number };
  prize: { x: number; y: number };
};
type Day13Input = ClawMachine[];

export class Day13Challenge extends Challenge<Day13Input> {
  DAY = 13;

  protected runWithInput(input: Day13Input): ChallengeSolution {
    const result = this.calculatePrice(input);
    const correctedMachines = input.map(this.correctedMachine);
    const correctedResult = this.calculatePrice(correctedMachines);

    return {
      part1: ['Fewest token to win all', result],
      part2: ['Fewest token to win all with correction', correctedResult],
    };
  }

  calculatePrice(machines: ClawMachine[]): number {
    return machines
      .map(this.findSolution)
      .filter((solution): solution is [number, number] => solution !== null)
      .reduce((acc, [nbA, nbB]) => acc + nbA * 3 + nbB, 0);
  }

  protected correctedMachine(machine: ClawMachine): ClawMachine {
    return {
      ...machine,
      prize: {
        x: machine.prize.x + 10000000000000,
        y: machine.prize.y + 10000000000000,
      },
    };
  }

  protected findSolution(machine: ClawMachine): [number, number] | null {
    const { buttonA, buttonB, prize } = machine;

    const denominator = buttonA.dy * buttonB.dx - buttonA.dx * buttonB.dy;
    if (denominator === 0) return null;

    const b = (buttonA.dy * prize.x - buttonA.dx * prize.y) / denominator;
    const a = (prize.x - b * buttonB.dx) / buttonA.dx;

    if (Number.isInteger(a) && Number.isInteger(b)) {
      return [a, b];
    } else {
      return null;
    }
  }

  protected parseInput(input: string): Day13Input {
    const lines = input.trim().split('\n\n');
    return lines.map(this.parseClawMachine);
  }

  private parseClawMachine(block: string): ClawMachine {
    const [buttonALine, buttonBLine, prizeLine] = block.split('\n');

    const parseCoordinates = (line: string) => ({
      dx: parseInt(line.match(/X\+(\d+)/)[1], 10),
      dy: parseInt(line.match(/Y\+(\d+)/)[1], 10),
    });

    const parsePrize = (line: string) => ({
      x: parseInt(line.match(/X=(\d+)/)[1], 10),
      y: parseInt(line.match(/Y=(\d+)/)[1], 10),
    });

    const buttonA = parseCoordinates(buttonALine);
    const buttonB = parseCoordinates(buttonBLine);
    const prize = parsePrize(prizeLine);

    return { buttonA, buttonB, prize };
  }
}

new Day13Challenge().run({ logging: true });
