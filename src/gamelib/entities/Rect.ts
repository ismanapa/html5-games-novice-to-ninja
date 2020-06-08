import { Entity } from './Entity';
import { EntityType } from './EntityTypeEnum';

export class Rect extends Entity {
  style: { [key: string]: string };

  constructor(w: number, h: number, style = { fill: '#333' }) {
    super();
    this.type = EntityType.Rect;
    this.pos = { x: 0, y: 0 };
    this.w = w;
    this.h = h;
    this.style = style;
  }
}
