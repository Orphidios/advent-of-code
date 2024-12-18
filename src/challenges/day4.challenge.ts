import { Challenge } from "../common/challenge.class.js";

type Day4Input = string[][];

export class Day4Challenge extends Challenge<Day4Input> {
    DAY = 4;
    maxheight = 0;
    maxwidth = 0;

    protected runWithInput(input: Day4Input): void {
        console.log('PART 1 : count XMAS', this.countAllXmas(input));
        console.log('PART 2 : count X_MAS', this.countAllX_MAS(input));
    }

    protected countAllXmas(input: Day4Input): number {
        let count = 0;
        for (let y = 0; y < this.maxheight; y++) {
            for (let x = 0; x < this.maxwidth; x++) {
                count += this.countXMAS(x, y, input);
            }
        }
        return count;
    }

    protected countAllX_MAS(input: Day4Input): number {
        let count = 0;
        for (let y = 1; y < this.maxheight - 1; y++) {
            for (let x = 1; x < this.maxwidth - 1; x++) {
                count += this.checkForX_Mas(x, y, input) ? 1 : 0;
            }
        }
        return count;
    }
    
    protected countXMAS(x: number, y: number, input: string[][]): number {
        if (input[y][x] !== 'X') {
            return 0;
        }

        const directions = [
            { dx: 1, dy: 0 },   // right
            { dx: -1, dy: 0 },  // left
            { dx: 0, dy: 1 },   // down
            { dx: 0, dy: -1 },  // up
            { dx: 1, dy: 1 },   // down-right
            { dx: 1, dy: -1 },  // up-right
            { dx: -1, dy: 1 },  // down-left
            { dx: -1, dy: -1 }  // up-left
        ];
        return directions.reduce((count, { dx, dy }) => count + (this.checkLineForXmas(x, y, input, dx, dy) ? 1 : 0), 0);
    }

    protected checkLineForXmas(x: number, y: number, input: string[][], dx: number, dy: number): boolean {
        let word = '';
        for (let i = 0; i < 4; i++) {
            word += input[y + i * dy]?.[x + i * dx] ?? '';
        }
        return word === 'XMAS';
    }

    protected checkForX_Mas(x: number, y: number, input: string[][]): boolean {
        if (input[y][x] !== 'A') {
            return false;
        }
        const descDiagonal = input[y - 1]?.[x - 1] + input[y]?.[x] + input[y + 1]?.[x + 1];
        const ascDiagonal = input[y - 1]?.[x + 1] + input[y]?.[x] + input[y + 1]?.[x - 1];
        return (descDiagonal === 'MAS' || descDiagonal === 'SAM') && (ascDiagonal === 'MAS' || ascDiagonal === 'SAM');
    }

    protected parseInput(input: string): Day4Input {
        const lines = input.split('\n').filter((line) => line != '').map((line) => line.split(''));
        this.maxheight = lines.length;
        this.maxwidth = lines[0].length;
        return lines;
    }
}

new Day4Challenge().run({ logging: true });
