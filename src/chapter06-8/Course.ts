import { Bodies, Body } from 'matter-js';
import { Vec, Rect } from '~gamelib';

export class Course extends Rect {
  body: Body;

  constructor(pos: Vec) {
    super(1000, 20, { fill: '#eee' });

    this.pivot = new Vec(this.w, this.h).multiply(0.5);
    this.anchor = Vec.from(this.pivot as Vec).multiply(-1);

    const body = Bodies.rectangle(0, 0, this.w, this.h, { isStatic: true });
    Body.setPosition(body, pos);
    Body.rotate(body, Math.PI * 0.04);

    // Sync the rectangle
    this.pos.copy(body.position as Vec);
    this.rotation = body.angle;

    this.body = body;
  }
}
