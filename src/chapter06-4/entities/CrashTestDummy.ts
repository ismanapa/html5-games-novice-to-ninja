import {
  Texture, TileSprite, Vec, UpdateBehaviour, math, physics,
} from '~gamelib';

import img from '../res/crash_test.png';

const texture = new Texture(img);

export class CrashTestDummy extends TileSprite {
  vel: Vec;
  bounds: { x: number; y: number; w: number; h: number; };
  onBounce: (t: number) => void;
  time: number;

  constructor(bounds: { x: number, y: number, w: number, h: number }, onBounce: (t: number) => void) {
    super(texture, 48, 48);
    this.vel = new Vec();
    this.acc = new Vec();
    this.bounds = bounds;
    this.onBounce = onBounce;

    this.time = 0;

    this.updateBehaviour = new CrashTestDummyBehaviour();
  }
}

class CrashTestDummyBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: CrashTestDummy): void {
    const {
      pos, vel, bounds,
    } = entity;

    if (entity.time === 0) {
      physics.applyImpulse(entity, {
        x: bounds.w,
        y: 0,
      } as Vec, dt);
    }
    entity.time += dt;

    physics.applyForce(entity, { x: 500, y: 0 } as Vec);

    entity.pos.add(physics.integrate(entity, dt));

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w) {
      vel.x *= -1;
      entity.onBounce(vel.x);
    }
  }
}
