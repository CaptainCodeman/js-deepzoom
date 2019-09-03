import { Rect, Point } from "@captaincodeman/geometry";
import { Layer } from "./layer";

export class Deepzoom { 
  readonly minLevel: number
  readonly maxLevel: number
  readonly rect: Rect

  constructor (readonly width: number, readonly height: number, readonly size: number = 254, readonly overlap: number = 1) {
    this.minLevel = Math.ceil(Math.log2(size))
    this.maxLevel = Math.ceil(Math.log2(Math.max(width, height)))
    this.rect = new Rect(new Point(0, 0), new Point(width, height))
  }

  private _layers : Layer[] = []

  getLayer(level: number) {
    if (level < this.minLevel || level > this.maxLevel) {
      throw new Error(`layer ${level} outside range ${this.minLevel}-${this.maxLevel}`)
    }

    let layer = this._layers[level]
    if (layer === undefined) {
      layer = new Layer(this, level)
      this._layers[level] = layer
    }

    return layer
  }
}
