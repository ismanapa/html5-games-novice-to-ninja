import { Sprite } from './Sprite';
import { Texture } from './Texture';
import { Coordinates } from '~gamelib/types';
import { EntityType } from './EntityTypeEnum';
import { AnimManager } from '~gamelib/AnimManager';

export class TileSprite extends Sprite {
  tileW: number;
  tileH: number;
  frame: Coordinates;
  type: EntityType;
  anims: AnimManager;

  constructor(texture: Texture, w: number, h: number) {
    super(texture);
    this.type = EntityType.TileSprite;
    this.tileW = w;
    this.tileH = h;
    this.frame = { x: 0, y: 0 };
    this.anims = new AnimManager(this);
  }

  setFrame(frame: Coordinates) {
    this.frame = frame;
  }

  update(dt: number) {
    this.anims.update(dt);
  }

  get w() {
    return this.tileW * Math.abs(this.scale.x);
  }

  get h() {
    return this.tileH * Math.abs(this.scale.y);
  }
}
