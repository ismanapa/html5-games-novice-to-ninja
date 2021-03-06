import {
  TileMap, Texture, math, Coordinates, TileSprite,
} from '~gamelib';

import tile from './res/images/tiles.png';

const texture = new Texture(tile);

export class Level extends TileMap {
  bounds: { left: number; right: number; top: number; bottom: number; };
  blank: Coordinates;
  lastTile: TileSprite;
  totalFreeSpots: number;

  constructor(w: number, h: number) {
    const tileSize = 32;
    const mapW = Math.ceil(w / tileSize);
    const mapH = Math.ceil(h / tileSize);

    const level = [];
    let totalFreeSpots = 0;
    for (let i = 0; i < mapW * mapH; i++) {
      const isTopOrBottom = i < mapW || Math.floor(i / mapW) === mapH - 1;
      const isLeft = i % mapW === 0;
      const isRight = i % mapW === mapW - 1;
      const isSecondRow = ((i / mapW) | 0) === 1;

      if (isTopOrBottom) {
        level.push({ x: 2, y: 1 });
      } else if (isLeft) {
        level.push({ x: 1, y: 1 });
      } else if (isRight) {
        level.push({ x: 3, y: 1 });
      } else if (isSecondRow) {
        level.push({ x: 4, y: 1 });
      } else {
        // Random ground tile
        level.push({ x: math.rand(1, 5), y: 0 });
        totalFreeSpots++;
      }
    }

    super(level, mapW, mapH, tileSize, tileSize, texture);

    this.bounds = {
      left: tileSize,
      right: w - tileSize * 2,
      top: tileSize,
      bottom: h - tileSize * 2,
    };

    this.blank = { x: 0, y: 0 };
    this.lastTile = null;
    this.totalFreeSpots = totalFreeSpots;
  }

  checkGround(pos: Coordinates) {
    const { blank, lastTile } = this;
    const currentTile = this.tileAtPixelPos(pos);
    if (lastTile === currentTile) {
      return 'checked';
    }
    this.lastTile = currentTile;
    if (currentTile.frame !== blank) {
      this.setFrameAtPixelPos(pos, blank);
      return 'solid';
    }
    return 'cleared';
  }

  getRandomPos() {
    const {
      w, h, blank, bounds,
    } = this;
    let found = false;
    let x;
    let y;

    while (!found) {
      x = math.rand(w);
      y = math.rand(h);
      const isCleared = this.tileAtPixelPos({ x, y }).frame === blank;
      const inBounds = x > bounds.left
        && x < bounds.right
        && y > bounds.top
        && y < bounds.bottom;

      if (inBounds && !isCleared) {
        found = true;
      }
    }
    return this.mapToPixelPos(this.pixelToMapPos({ x, y }));
  }
}
