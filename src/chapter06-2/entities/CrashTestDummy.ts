import {
  Texture, TileSprite, Vec, UpdateBehaviour,
} from '~gamelib';

import img from '../res/crash_test.png';

const texture = new Texture(img);

export class CrashTestDummy extends TileSprite {
  vel: Vec;

  constructor(vel: number) {
    super(texture, 48, 48);
    this.vel = new Vec(vel, 0);
    this.pivot = { x: 24, y: 24 };

    this.updateBehaviour = new CrashTestDummyBehaviour();
  }
}

class CrashTestDummyBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: CrashTestDummy): void {
    const { pos, vel } = entity;

    // Move in the direction of the path
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;

    // Or...
    // pos.add(vel.clone().multiply(dt));

    entity.rotation += 5 * dt;
  }
}
