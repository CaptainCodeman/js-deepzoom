import { Point } from "@captaincodeman/geometry/point";
import { Rect } from "@captaincodeman/geometry/rect";
import { Layer } from "./layer";

export class Tile {
  public level: number
  public key: string

  constructor(readonly layer: Layer, readonly col: number, readonly row: number) {
    this.level = layer.level
    this.key = `${this.col}:${this.row}:${this.level}`
  }

  private _rect: Rect

  // position of tile within layer
  get rect() {
    if (this._rect === undefined) {
      const size = this.layer.deepzoom.size
      const overlap = this.layer.deepzoom.overlap
      
      const x1 = Math.max(this.col * size - overlap, 0)
      const y1 = Math.max(this.row * size - overlap, 0)
      const x2 = Math.min((this.col + 1) * size + overlap, this.layer.width);
      const y2 = Math.min((this.row + 1) * size + overlap, this.layer.height);
  
      this._rect = new Rect(new Point(x1, y1), new Point(x2, y2))
    }

    return this._rect
  }
}
