import { UpdateBehaviour, wallSlide } from '~gamelib';
import { Player } from './Player';

export class PlayerBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Player): void {
    const {
      pos, controls, speed, gameOver,
    } = entity;

    if (gameOver) {
      entity.rotation += dt * 5;
      entity.pivot.y = 16;
      entity.pivot.x = 16;
      return;
    }

    const { x, y } = controls;
    const xo = x * dt * speed;
    const yo = y * dt * speed;
    const r = wallSlide(entity, entity.map, xo, yo);
    if (r.x !== 0 && r.y !== 0) {
      r.x /= Math.sqrt(2);
      r.y /= Math.sqrt(2);
    }
    pos.x += r.x;
    pos.y += r.y;

    // Animate!
    if (r.x || r.y) {
      entity.frame.x = ((t / 0.08) | 0) % 4;
      if (r.x < 0) {
        entity.scale.x = -1;
        entity.anchor.x = 48;
      }
      if (r.x > 0) {
        entity.scale.x = 1;
        entity.anchor.x = 0;
      }
    } else {
      entity.frame.x = ((t / 0.2) | 0) % 2 + 4;
    }
  }
}
