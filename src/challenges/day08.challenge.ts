import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day8Input = string[][];
type Position = { x: number; y: number };
type FrequencyMap = Map<string, Position[]>;

export class Day8Challenge extends Challenge<Day8Input> {
  DAY = 8;
  MAX_X: number;
  MAX_Y: number;

  protected runWithInput(input: Day8Input): ChallengeSolution {
    const frequencyMap = this.createFrequencyMap(input);
    const antinodes = this.findAntinodes(frequencyMap);
    const antinodesWithHarmonics = this.findAntinodes(frequencyMap, true);
    return {
      part1: ['Number of Antinodes', antinodes.size],
      part2: [
        'Number of Antinodes with harmonics',
        antinodesWithHarmonics.size,
      ],
    };
  }

  protected findAntinodes(
    frequencyMap: FrequencyMap,
    withHarmonics: boolean = false,
  ): Set<string> {
    const uniqueAntinodes = new Set<string>();

    for (const antennas of frequencyMap.values()) {
      antennas.forEach((pos1, i) => {
        antennas.slice(i + 1).forEach((pos2) => {
          const antinodes = this.calculateAntinodes(pos1, pos2, withHarmonics);
          antinodes.forEach((pos) => uniqueAntinodes.add(pos));
        });
      });
    }

    return uniqueAntinodes;
  }

  protected isWithinBounds({ x, y }: Position): boolean {
    return x >= 0 && x < this.MAX_X && y >= 0 && y < this.MAX_Y;
  }

  protected calculateAntinodes(
    pos1: Position,
    pos2: Position,
    withHarmonics: boolean = false,
  ): Set<string> {
    const dx = pos2.x - pos1.x;
    const dy = pos2.y - pos1.y;
    const validAntinodes: Set<string> = new Set();

    let k = 1;
    while (true) {
      const antinode1: Position = { x: pos2.x + k * dx, y: pos2.y + k * dy };
      const antinode2: Position = { x: pos1.x - k * dx, y: pos1.y - k * dy };

      const isWithinBounds1 = this.isWithinBounds(antinode1);
      const isWithinBounds2 = this.isWithinBounds(antinode2);

      if (isWithinBounds1) validAntinodes.add(`${antinode1.x},${antinode1.y}`);
      if (isWithinBounds2) validAntinodes.add(`${antinode2.x},${antinode2.y}`);

      if ((!isWithinBounds1 && !isWithinBounds2) || !withHarmonics) break;

      k++;
    }

    if (withHarmonics) {
      validAntinodes.add(`${pos1.x},${pos1.y}`);
      validAntinodes.add(`${pos2.x},${pos2.y}`);
    }

    return validAntinodes;
  }

  protected createFrequencyMap(puzzleMap: Day8Input): FrequencyMap {
    const frequencyMap: FrequencyMap = new Map();
    puzzleMap.forEach((row, y) => {
      row.forEach((char, x) => {
        if (char !== '.') {
          if (!frequencyMap.has(char)) {
            frequencyMap.set(char, []);
          }
          frequencyMap.get(char)!.push({ x, y });
        }
      });
    });
    return frequencyMap;
  }

  protected parseInput(input: string): Day8Input {
    const map: Day8Input = input.split('\n').map((line) => line.split(''));
    this.MAX_Y = map.length;
    this.MAX_X = map[0].length;
    return map;
  }
}

new Day8Challenge().run({ logging: true });
