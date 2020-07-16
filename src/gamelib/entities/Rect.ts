import { Entity } from './Entity';
import { EntityType } from './EntityTypeEnum';
import { Vec } from '~gamelib/utils/Vec';

export class Rect extends Entity {
  style: { [key: string]: string };

  constructor(w: number, h: number, style = { fill: '#333' }) {
    super();
    this.type = EntityType.Rect;
    this.pos = new Vec(0, 0);
    this.w = w;
    this.h = h;
    this.style = style;
  }
}
