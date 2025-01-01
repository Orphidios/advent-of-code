import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

export class InputFileHelper {
  public static readDayInputFile(day: number): string {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, `../../inputs/day${day}.input.txt`);

    try {
      return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.error(`\x1b[31mFile not found: ${filePath}\x1b[0m`);
      } else {
        throw error;
      }
    }
  }
}
