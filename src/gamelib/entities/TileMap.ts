import { Container } from './Container';
import { Coordinates, HitBox } from '../types';
import { TileSprite } from './TileSprite';
import { Texture } from './Texture';

export class TileMap extends Container {
  mapW: number;
  mapH: number;
  tileW: number;
  tileH: number;
  w: number;
  h: number;
  children: TileSprite[];

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


  pixelToMapPos(pos: Coordinates) {
    const { tileW, tileH } = this;
    return {
      x: Math.floor(pos.x / tileW),
      y: Math.floor(pos.y / tileH),
    };
  }

  mapToPixelPos(mapPos: Coordinates) {
    const { tileW, tileH } = this;
    return {
      x: mapPos.x * tileW,
      y: mapPos.y * tileH,
    };
  }

  tileAtMapPos(mapPos: Coordinates) {
    return this.children[mapPos.y * this.mapW + mapPos.x];
  }

  tileAtPixelPos(pos: Coordinates) {
    return this.tileAtMapPos(this.pixelToMapPos(pos));
  }

  setFrameAtMapPos(mapPos: Coordinates, frame: Coordinates) {
    const tile = this.tileAtMapPos(mapPos);
    tile.frame = frame;
    return tile;
  }

  setFrameAtPixelPos(pos: Coordinates, frame: Coordinates) {
    return this.setFrameAtMapPos(this.pixelToMapPos(pos), frame);
  }

  tilesAtCorners(bounds: HitBox, xo = 0, yo = 0) {
    return [
      [bounds.x, bounds.y], // Top-left
      [bounds.x + bounds.w, bounds.y], // Top-right
      [bounds.x, bounds.y + bounds.h], // Bottom-left
      [bounds.x + bounds.w, bounds.y + bounds.h], // Bottom-right
    ].map(([x, y]) => this.tileAtPixelPos({
      x: x + xo,
      y: y + yo,
    }));
  }
}
