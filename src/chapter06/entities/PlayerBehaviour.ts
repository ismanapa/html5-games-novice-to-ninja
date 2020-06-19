import { UpdateBehaviour, wallSlide } from '~gamelib';
import { Player } from './Player';

export class PlayerBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Player): void {
    const {
      pos, controls, map, speed, gameOver,
    } = entity;

    if (gameOver) {
      entity.rotation += dt * 5;
      entity.pivot.y = 24;
      entity.pivot.x = 24;
      return;
    }

    const { x } = controls;
    const xo = x * dt * speed;
    let yo = 0;

    if (!entity.jumping && controls.action) {
      entity.vel = -10;
      entity.jumping = true;
    }

    if (entity.jumping) {
      yo += entity.vel;
      entity.vel += 32 * dt;
    }

    const r = wallSlide(entity, map, xo, yo);
    if (r.hits.down) {
      entity.jumping = false;
      entity.vel = 0;
    }
    if (r.hits.up) {
      entity.vel = 0;
    }

    // Check if falling
    if (!entity.jumping && !r.hits.down) {
      entity.jumping = true;
      entity.vel = 3;
    }

    pos.x += r.x;
    pos.y += r.y;

    // Animations
    if (r.x || r.y) {
      if (x && !entity.jumping) {
        entity.frame.x = ((t / 0.1) | 0) % 4;
        if (x > 0) {
          entity.anchor.x = 0;
          entity.scale.x = 1;
        } else if (x < 0) {
          entity.anchor.x = entity.w;
          entity.scale.x = -1;
        }
      }
    } else {
      entity.frame.x = ((t / 0.2) | 0) % 2 + 4;
    }
  }
}
