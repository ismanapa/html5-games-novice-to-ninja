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
  radius: number;

  constructor(bounds: { x: number, y: number, w: number, h: number }) {
    super(texture, 48, 48);
    this.pivot = { x: 24, y: 24 };
    this.radius = 24;
    this.frame.x = math.rand(4);
    this.vel = new Vec();
    this.acc = new Vec();
    this.bounds = bounds;
    this.rotation = math.rand(4) * (Math.PI / 2);

    this.updateBehaviour = new CrashTestDummyBehaviour();
  }
}

class CrashTestDummyBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: CrashTestDummy): void {
    const {
      pos, vel, bounds, w, h,
    } = entity;

    if (math.randOneIn(500)) {
      const MAX_POWER = 500;
      physics.applyImpulse(
        entity,
        {
          x: math.rand(-MAX_POWER, MAX_POWER),
          y: math.rand(-MAX_POWER, MAX_POWER),
        } as Vec,
        dt,
      );
    }

    physics.applyFriction(entity, 100);
    physics.integratePos(entity, dt);

    // Bounce off the walls
    if (pos.x < 0 || pos.x > bounds.w - w) {
      vel.x *= -1;
      pos.x = pos.x < 0 ? 0 : bounds.w - w;
    }
    if (pos.y < 0 || pos.y > bounds.h - h) {
      vel.y *= -1;
      pos.y = pos.y < 0 ? 0 : bounds.h - h;
    }
  }
}
