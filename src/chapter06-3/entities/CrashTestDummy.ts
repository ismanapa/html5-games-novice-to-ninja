import {
  Texture, TileSprite, Vec, UpdateBehaviour, math,
} from '~gamelib';

import img from '../res/crash_test.png';

const texture = new Texture(img);

export class CrashTestDummy extends TileSprite {
  vel: Vec;
  bounds: { x: number; y: number; w: number; h: number; };

  constructor(bounds: { x: number, y: number, w: number, h: number }) {
    super(texture, 48, 48);
    this.frame.x = math.rand(4);
    this.vel = new Vec(math.rand(-300, 300), math.rand(-300, 300));
    this.pos.set(bounds.w / 2, bounds.h / 2);
    this.bounds = bounds;
    this.rotation = math.rand(4) * (Math.PI / 2);
    this.pivot = { x: 24, y: 24 };

    this.updateBehaviour = new CrashTestDummyBehaviour();
  }
}

class CrashTestDummyBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: CrashTestDummy): void {
    const {
      pos, vel, bounds, w, h,
    } = entity;

    // Move in the direction of the path
    // pos.x += vel.x * dt;
    // pos.y += vel.y * dt;

    // Or...
    pos.add(vel.clone().multiply(dt));

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      vel.x *= -1;
      entity.rotation += Math.PI;
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      vel.y *= -1;
      entity.rotation += Math.PI;
    }
  }
}
