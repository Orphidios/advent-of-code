import { Challenge } from '../common/challenge.class.js';

type FileBlock = string[];
type DiskMap = Array<FileBlock>;
type DiskState = string[];

export class Day9Challenge extends Challenge<DiskMap> {
  DAY = 9;

  protected runWithInput(diskMap: DiskMap): void {
    console.log('\nCompact by moving file blocks one by one:');
    const compactedDisk = this.compactByMovingBlocks(diskMap);
    console.log('checkSum:', this.calculateChecksum(compactedDisk));

    console.log('\nCompact by moving entire files:');
    const compactedDiskByFiles = this.compactByMovingFiles(diskMap);
    console.log('checkSum:', this.calculateChecksum(compactedDiskByFiles));
  }

  protected compactByMovingBlocks(diskMap: DiskMap): DiskState {
    const flattenedDisk = diskMap.flat();
    let endIndex = flattenedDisk.length - 1;

    for (let i = 0; i < flattenedDisk.length; i++) {
      if (flattenedDisk[i] === '.') {
        while (endIndex > i && flattenedDisk[endIndex] === '.') {
          endIndex--;
        }
        if (endIndex > i) {
          flattenedDisk[i] = flattenedDisk[endIndex];
          flattenedDisk[endIndex] = '.';
          endIndex--;
        }
      }
    }

    return flattenedDisk;
  }

  protected compactByMovingFiles(diskMap: DiskMap): DiskState {
    const disk = diskMap.map((fileBlock) => [...fileBlock]);

    for (let j = disk.length - 1; j > 0; j--) {
      if (disk[j][0] === '.') continue;

      for (let i = 0; i <= j; i++) {
        if (disk[i][0] !== '.' || disk[i].length < disk[j].length) continue;

        const remainingSpace = disk[i].length - disk[j].length;
        disk[i] = disk[j];
        disk[j] = new Array(disk[j].length).fill('.');

        if (remainingSpace > 0) {
          disk.splice(i + 1, 0, new Array(remainingSpace).fill('.'));
          j++;
        }
        break;
      }
    }

    return disk.flat();
  }

  protected calculateChecksum(diskState: DiskState): number {
    return diskState.reduce(
      (sum, block, index) =>
        block === '.' ? sum : sum + index * parseInt(block),
      0,
    );
  }

  protected parseInput(input: string): DiskMap {
    return input
      .split('')
      .map((length, index) => {
        const pattern = index % 2 === 0 ? (index / 2).toString() : '.';
        return new Array(parseInt(length)).fill(pattern);
      })
      .filter((fileBlock) => fileBlock.length > 0);
  }
}

new Day9Challenge().run({ logging: true });
