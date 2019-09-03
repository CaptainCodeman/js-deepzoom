import { expect } from 'chai';

import { Deepzoom } from './deepzoom';

describe('deepzoom', () => {
  it('it should set correct min / max levels', () => {
    const tests = [
      { width: 800, height: 600, size:  32, min: 5, max: 10 },
      { width: 800, height: 600, size:  64, min: 6, max: 10 },
      { width: 800, height: 600, size: 128, min: 7, max: 10 },
      { width: 800, height: 600, size: 256, min: 8, max: 10 },

      { width: 8000, height: 6000, size:  32, min: 5, max: 13 },
      { width: 8000, height: 6000, size:  64, min: 6, max: 13 },
      { width: 8000, height: 6000, size: 128, min: 7, max: 13 },
      { width: 8000, height: 6000, size: 256, min: 8, max: 13 },

      { width: 10000, height: 10000, size:  32, min: 5, max: 14 },
      { width: 10000, height: 10000, size:  64, min: 6, max: 14 },
      { width: 10000, height: 10000, size: 128, min: 7, max: 14 },
      { width: 10000, height: 10000, size: 256, min: 8, max: 14 },
    ]
    
    tests.forEach(test => {
      const dz = new Deepzoom(test.width, test.height, test.size, 0)

      expect(dz.minLevel).to.equal(test.min)
      expect(dz.maxLevel).to.equal(test.max)
    })
  });

  it('it should set correct layer dimensions and zoom', () => {
    const tests = [
      { width: 8000, height: 6000, size: 256, layers: [
        { level: 13, width: 8000, height: 6000, cols: 32, rows: 24, scale: 1.0 },
        { level: 12, width: 4000, height: 3000, cols: 16, rows: 12, scale: 0.5 },
        { level: 11, width: 2000, height: 1500, cols:  8, rows:  6, scale: 0.25 },
        { level: 10, width: 1000, height:  750, cols:  4, rows:  3, scale: 0.125 },
        { level:  9, width:  500, height:  375, cols:  2, rows:  2, scale: 0.0625 },
        { level:  8, width:  250, height:  188, cols:  1, rows:  1, scale: 0.03125 },
      ]},
      { width: 4200, height: 2800, size: 128, layers: [
        { level: 13, width: 4200, height: 2800, cols: 33, rows: 22, scale: 1.0 },
        { level: 12, width: 2100, height: 1400, cols: 17, rows: 11, scale: 0.5 },
        { level: 11, width: 1050, height:  700, cols:  9, rows:  6, scale: 0.25 },
        { level: 10, width:  525, height:  350, cols:  5, rows:  3, scale: 0.125 },
        { level:  9, width:  263, height:  175, cols:  3, rows:  2, scale: 0.0625 },
        { level:  8, width:  132, height:   88, cols:  2, rows:  1, scale: 0.03125 },
        { level:  7, width:   66, height:   44, cols:  1, rows:  1, scale: 0.015625 },
      ]},
      { width: 4224, height: 3168, size: 256, layers: [
        { level: 13, width: 4224, height: 3168, cols: 17, rows: 13, scale: 1.0 },
        { level: 12, width: 2112, height: 1584, cols:  9, rows:  7, scale: 0.5 },
        { level: 11, width: 1056, height:  792, cols:  5, rows:  4, scale: 0.25 },
        { level: 10, width:  528, height:  396, cols:  3, rows:  2, scale: 0.125 },
        { level:  9, width:  264, height:  198, cols:  2, rows:  1, scale: 0.0625 },
        { level:  8, width:  132, height:   99, cols:  1, rows:  1, scale: 0.03125 },
      ]},
    ]
    
    tests.forEach(test => {
      const dz = new Deepzoom(test.width, test.height, test.size, 1)

      test.layers.forEach(testLayer => {
        const layer = dz.getLayer(testLayer.level)

        expect(layer.width).to.equal(testLayer.width)
        expect(layer.height).to.equal(testLayer.height)
        expect(layer.cols).to.equal(testLayer.cols)
        expect(layer.rows).to.equal(testLayer.rows)
        expect(layer.scale).to.equal(testLayer.scale)
      })
    })
  });

  it('it should calculate tile positions', () => {
    const tests = [
      { col: 0, row: 0, x1:    0, y1:   0, x2:  257, y2: 257, w: 257, h: 257 },
      { col: 0, row: 1, x1:    0, y1: 255, x2:  257, y2: 513, w: 257, h: 258 },
      { col: 0, row: 2, x1:    0, y1: 511, x2:  257, y2: 769, w: 257, h: 258 },
      { col: 0, row: 3, x1:    0, y1: 767, x2:  257, y2: 792, w: 257, h:  25 },
      { col: 1, row: 0, x1:  255, y1:   0, x2:  513, y2: 257, w: 258, h: 257 },
      { col: 1, row: 1, x1:  255, y1: 255, x2:  513, y2: 513, w: 258, h: 258 },
      { col: 1, row: 2, x1:  255, y1: 511, x2:  513, y2: 769, w: 258, h: 258 },
      { col: 1, row: 3, x1:  255, y1: 767, x2:  513, y2: 792, w: 258, h:  25 },
      { col: 2, row: 0, x1:  511, y1:   0, x2:  769, y2: 257, w: 258, h: 257 },
      { col: 2, row: 1, x1:  511, y1: 255, x2:  769, y2: 513, w: 258, h: 258 },
      { col: 2, row: 2, x1:  511, y1: 511, x2:  769, y2: 769, w: 258, h: 258 },
      { col: 2, row: 3, x1:  511, y1: 767, x2:  769, y2: 792, w: 258, h:  25 },
      { col: 3, row: 0, x1:  767, y1:   0, x2: 1025, y2: 257, w: 258, h: 257 },
      { col: 3, row: 1, x1:  767, y1: 255, x2: 1025, y2: 513, w: 258, h: 258 },
      { col: 3, row: 2, x1:  767, y1: 511, x2: 1025, y2: 769, w: 258, h: 258 },
      { col: 3, row: 3, x1:  767, y1: 767, x2: 1025, y2: 792, w: 258, h:  25 },
      { col: 4, row: 0, x1: 1023, y1:   0, x2: 1056, y2: 257, w:  33, h: 257 },
      { col: 4, row: 1, x1: 1023, y1: 255, x2: 1056, y2: 513, w:  33, h: 258 },
      { col: 4, row: 2, x1: 1023, y1: 511, x2: 1056, y2: 769, w:  33, h: 258 },
      { col: 4, row: 3, x1: 1023, y1: 767, x2: 1056, y2: 792, w:  33, h:  25 },
    ]

    const dz = new Deepzoom(4224, 3168, 256, 1)
    const level = 11
      
    tests.forEach(test => {
      const layer = dz.getLayer(level)
      const tile = layer.getTile(test.col, test.row)
      const rect = tile.rect

      expect(tile.col).to.equal(test.col, 'col')
      expect(tile.row).to.equal(test.row, 'row')
      expect(rect.width).to.equal(test.w, 'w')
      expect(rect.height).to.equal(test.h, 'h')
      expect(rect.min.x).to.equal(test.x1, 'x1')
      expect(rect.min.y).to.equal(test.y1, 'y1')
      expect(rect.max.x).to.equal(test.x2, 'x2')
      expect(rect.max.y).to.equal(test.y2, 'y2')
    })
  })
});
