import { Challenge, ChallengeSolution } from '../common/challenge.class.js';

type Day12Input = string[][];

export class Day12Challenge extends Challenge<Day12Input> {
  DAY = 12;

  garden: Day12Input;

  protected runWithInput(input: Day12Input): ChallengeSolution {
    this.processGarden(input);
    const price = Region.getTotalPrice();
    const priceWithDiscount = Region.getTotalPriceWithDiscount();
    return {
      part1: ['Total price of fencing for all regions', price],
      part2: ['Total price with discount for all regions', priceWithDiscount],
    };
  }

  private processGarden(input: Day12Input): void {
    this.garden = input;
    for (let y = 0; y < this.garden.length; y++) {
      for (let x = 0; x < this.garden[y].length; x++) {
        this.processCell(x, y);
      }
    }
  }

  protected processCell(x: number, y: number): void {
    const region = this.getOrCreateRegion(x, y);
    region.addCellToRegion(x, y);
  }

  protected getOrCreateRegion(x: number, y: number): Region | null {
    const cellType = this.garden[y][x];
    const upRegion = Region.getRegion(x, y - 1);
    const leftRegion = Region.getRegion(x - 1, y);

    if (cellType === upRegion?.type && cellType === leftRegion?.type) {
      if (upRegion.id !== leftRegion.id) upRegion.merge(leftRegion);
      return upRegion;
    }
    if (cellType === upRegion?.type) return upRegion;
    if (cellType === leftRegion?.type) return leftRegion;
    return new Region(`${x},${y}`, cellType);
  }

  protected parseInput(input: string): Day12Input {
    return input.split('\n').map((line) => line.split(''));
  }
}

class Region {
  private static CURRENT_ID = 0;
  private static cellToRegionIdMap: Map<string, number> = new Map();
  public static entities: Map<number, Region> = new Map();

  id: number;
  type: string;
  area: number;
  perimeter: number;
  sideNb: number;
  cellIds: Set<string>;

  constructor(firstCellId: string, type: string) {
    Region.CURRENT_ID++;
    this.id = Region.CURRENT_ID;
    this.type = type;
    this.area = 1;
    this.perimeter = 4;
    this.sideNb = 4;
    this.cellIds = new Set([firstCellId]);
    Region.entities.set(this.id, this);
    Region.cellToRegionIdMap.set(firstCellId, this.id);
  }

  public merge(region: Region): void {
    this.area += region.area;
    this.perimeter += region.perimeter;
    this.sideNb += region.sideNb;
    for (const cellId of region.cellIds) {
      this.cellIds.add(cellId);
      Region.cellToRegionIdMap.set(cellId, this.id);
    }
    Region.entities.delete(region.id);
  }

  public addCellToRegion(x: number, y: number): void {
    if (this.cellIds.has(`${x},${y}`)) return;
    Region.cellToRegionIdMap.set(`${x},${y}`, this.id);
    this.cellIds.add(`${x},${y}`);
    this.area++;
    this.updateRegionSideAndPerimeter(x, y);
  }

  protected updateRegionSideAndPerimeter(x: number, y: number): void {
    const sameTypeAsUpLeftCell = this.cellIds.has(`${x - 1},${y - 1}`);
    const sameTypeAsUpCell = this.cellIds.has(`${x},${y - 1}`);
    const sameTypeAsUpRightCell = this.cellIds.has(`${x + 1},${y - 1}`);
    const sameTypeAsLeftCell = this.cellIds.has(`${x - 1},${y}`);

    if (sameTypeAsUpCell && sameTypeAsLeftCell) {
      this.sideNb -= sameTypeAsUpRightCell ? 0 : 2;
    } else if (sameTypeAsUpCell) {
      const additionalSides = [
        sameTypeAsUpLeftCell,
        sameTypeAsUpRightCell,
      ].reduce((acc, isSame) => (isSame ? acc + 2 : acc), 0);
      this.sideNb += additionalSides;
      this.perimeter += 2;
    } else {
      this.sideNb += sameTypeAsUpLeftCell ? 2 : 0;
      this.perimeter += 2;
    }
  }

  public static getRegion(x: number, y: number): Region | null {
    return y >= 0 && x >= 0
      ? this.entities.get(this.cellToRegionIdMap.get(`${x},${y}`)) || null
      : null;
  }

  public static getTotalPrice(): number {
    return Array.from(this.entities.values()).reduce(
      (total, region) => total + region.area * region.perimeter,
      0,
    );
  }

  public static getTotalPriceWithDiscount(): number {
    return Array.from(this.entities.values()).reduce(
      (total, region) => total + region.area * region.sideNb,
      0,
    );
  }
}

new Day12Challenge().run({ logging: true });
