import {
  UpdateBehaviour, wallSlide, physics, Vec, entity as entityHelper
} from '~gamelib';
import { Player } from './Player';

const GRAVITY = 2900;
const JUMP_IMPULSE = 780;
const STEER_FORCE = 2000;
const MAX_VEL = 300;
const MIN_VEL = 200;
const FRICTION_GROUND = 1800;

export class PlayerBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Player): void {
    const {
      pos, controls, map, vel, gameOver,
    } = entity;

    if (gameOver) {
      entity.rotation += dt * 5;
      entity.pivot.y = 24;
      entity.pivot.x = 24;
      return;
    }

    const { x, action } = controls;

    if (!entity.falling && action) {
      physics.applyImpulse(
        entity,
        { x: 0, y: -JUMP_IMPULSE } as Vec,
        dt,
      );
      entity.falling = true;
    }

    if (entity.falling) {
      physics.applyForce(entity, { x: 0, y: GRAVITY } as Vec);
    }

    // So you can jump and change dir (even though moving fast)
    const changingDirection = (x > 0 && vel.x < 0) || (x < 0 && vel.x > 0);

    // Instant speed up.
    if (x !== 0 && Math.abs(vel.x) < MIN_VEL) {
      physics.applyForce(entity, { x: x * STEER_FORCE * 2, y: 0 } as Vec);
    } else if (changingDirection || (x && vel.mag() < MAX_VEL)) {
      physics.applyForce(entity, { x: x * STEER_FORCE, y: 0 } as Vec);
    }

    physics.applyHorizontalFriction(entity, FRICTION_GROUND);

    let r = physics.integrate(entity, dt);

    // Stop friction when really small (prevents sliding)
    if (vel.mag() <= 10) {
      vel.set(0, 0);
    }
    const wallResult = wallSlide(entity, map, r.x, r.y);
    r = { x: wallResult.x, y: wallResult.y } as Vec;
    pos.add(r);

    if (x && !entity.falling) {
      entity.frame.x = ((t / 100) | 0) % 2;
    }

    if (wallResult.hits.down) {
      vel.y = 0;
      entity.falling = false;
    }

    if (wallResult.hits.up) {
      vel.set(0, 0);
    }
    if (wallResult.hits.left || wallResult.hits.right) {
      vel.x = 0;
    }

    // Check if falling
    if (!entity.falling && !wallResult.hits.down) {
      // check if UNDER current is empty...
      const e = entityHelper.bounds(entity);
      const leftFoot = map.pixelToMapPos({ x: e.x, y: e.y + e.h + 1 });
      const rightFoot = map.pixelToMapPos({ x: e.x + e.w, y: e.y + e.h + 1 });
      const left = map.tileAtMapPos(leftFoot).frame.walkable;
      const right = map.tileAtMapPos(rightFoot).frame.walkable;
      if (left && right) {
        entity.falling = true;
      }
    }
    // Animations
    if (x && !entity.falling) {
      entity.frame.x = ((t / 0.1) | 0) % 4;
      if (x > 0) {
        entity.anchor.x = 0;
        entity.scale.x = 1;
      } else if (x < 0) {
        entity.anchor.x = entity.w;
        entity.scale.x = -1;
      }
    }
  }
}
