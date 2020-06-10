import { UpdateBehaviour } from '~gamelib';
import { Player } from './Player';

export class PlayerBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Player): void {
    const { pos, controls, speed } = entity;

    const { x, y } = controls;
    const xo = x * dt * speed;
    const yo = y * dt * speed;
    pos.x += xo;
    pos.y += yo;

    // Animate!
    if (xo || yo) {
      // Walking frames
      entity.frame.x = ((t / 0.08) | 0) % 4;
      // Walking left or right?
      if (xo < 0) {
        entity.scale.x = -1;
        entity.anchor.x = 48;
      }
      if (xo > 0) {
        entity.scale.x = 1;
        entity.anchor.x = 0;
      }
    } else {
      // Just hanging out
      entity.frame.x = ((t / 0.2) | 0) % 2 + 4;
    }
  }
}
