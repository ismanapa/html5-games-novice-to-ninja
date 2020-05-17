import { Sprite } from './Sprite';
import { Texture } from './Texture';
import { Coordinates } from '~gamelib/types';
import { EntityType } from './EntityTypeEnum';

export class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: Coordinates;
  type: EntityType;

  constructor(texture: Texture, w: number, h: number) {
    super(texture);
    this.type = EntityType.TileSprite;
    this.tileW = w;
    this.tileH = h;
    this.frame = { x: 0, y: 0 };
  }

  setFrame(frame: Coordinates) {
    this.frame = frame;
  }
}
