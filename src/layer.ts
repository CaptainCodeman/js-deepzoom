import { Tile } from "./tile";
import { Deepzoom } from "./deepzoom";
import { Point } from '@captaincodeman/geometry/point';
import { Rect } from '@captaincodeman/geometry/rect';

export class Layer {
  readonly scale: number
  readonly width: number
  readonly height: number
  readonly cols: number
  readonly rows: number
  readonly rect: Rect

  constructor(readonly deepzoom: Deepzoom, readonly level: number) {
    this.scale = Math.pow(0.5, (deepzoom.maxLevel - level));
    this.width = Math.ceil(deepzoom.width * this.scale);
    this.height = Math.ceil(deepzoom.height * this.scale);
    this.rect = new Rect(new Point(0, 0), new Point(this.width, this.height))
    this.cols = Math.ceil(this.width / deepzoom.size);
    this.rows = Math.ceil(this.height / deepzoom.size);
  }

  private _tiles : Tile[][] = []

  getTile(col: number, row: number) {
    if (col < 0 || col >= this.cols) {
      throw new Error(`col ${col} outside range 0-${this.cols - 1}`)
    }

    if (row < 0 || row >= this.rows) {
      throw new Error(`row ${row} outside range 0-${this.rows - 1}`)
    }

    let tilerow = this._tiles[row]
    if (tilerow === undefined) {
      tilerow = []
      this._tiles[row] = tilerow
    }

    let tile = tilerow[col]
    if (tile === undefined) {
      tile = new Tile(this, col, row)
      tilerow[col] = tile
    }

    return tile
  }
}
