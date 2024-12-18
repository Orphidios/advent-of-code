import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export class InputFileHelper {
    public static readDayInputFile(day: number): string {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, `../../inputs/day${day}.input.txt`);
        return fs.readFileSync(filePath, 'utf-8');
    }
}