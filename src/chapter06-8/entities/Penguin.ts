import { Bodies, Body } from 'matter-js';
import { TileSprite, Vec, Texture, UpdateBehaviour } from '~gamelib';

import tiles from '../res/images/pengolfuin.png';

const texture = new Texture(tiles);

export class Penguin extends TileSprite {
  body: Body;

  constructor(pos: Vec) {
    super(texture, 32, 32);
    this.pivot.x = this.w / 2;
    this.pivot.y = this.h / 2;
    this.anchor = Vec.from(this.pivot as Vec).multiply(-1);

    this.body = Bodies.circle(pos.x, pos.y, 10, {
      restitution: 0.7,
    });

    this.body.torque = 0.002;

    this.updateBehaviour = new PenguinBehaviour();
  }

  fire(angle: number, power: number) {
    const { body } = this;
    Body.applyForce(
      body,
      { x: body.position.x, y: body.position.y - 10 },
      { x: Math.cos(angle) * power, y: Math.sin(angle) * power },
    );
  }
}

class PenguinBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Penguin): void {
    const { pos, body } = entity;
    entity.rotation = body.angle;
    pos.copy(body.position as Vec);
  }
}
