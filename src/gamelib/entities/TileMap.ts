import { Container } from './Container';
import { Coordinates } from '../types';
import { TileSprite } from './TileSprite';
import { Texture } from './Texture';

export class TileMap extends Container {
  mapW: number;
  mapH: number;
  tileW: number;
  tileH: number;
  w: number;
  h: number;

  constructor(
    tiles: Coordinates[],
    mapW: number,
    mapH: number,
    tileW: number,
    tileH: number,
    texture: Texture,
  ) {
    super();

    this.mapW = mapW;
    this.mapH = mapH;
    this.tileW = tileW;
    this.tileH = tileH;
    this.w = mapW * tileW;
    this.h = mapH * tileH;

    // Add all tile sprites
    this.children = tiles.map((frame: Coordinates, i: number) => {
      const s = new TileSprite(texture, tileW, tileH);
      s.frame = frame;
      s.pos.x = i % mapW * tileW;
      s.pos.y = Math.floor(i / mapW) * tileH;
      return s;
    });
  }
}
