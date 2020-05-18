import { TileMap, Texture, math } from '~gamelib';

import tile from './res/images/tiles.png';

const texture = new Texture(tile);

export class Level extends TileMap {
  constructor(w: number, h: number) {
    const tileSize = 32;
    const mapW = Math.ceil(w / tileSize);
    const mapH = Math.ceil(h / tileSize);

    const level = [];
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
      }
    }

    super(level, mapW, mapH, tileSize, tileSize, texture);
  }
}
