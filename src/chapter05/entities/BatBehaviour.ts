import { UpdateBehaviour } from '~gamelib';

import { Bat } from './Bat';

export class BatBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Bat): void {
    const { pos, dir, speed } = entity;

    const { x, y } = dir;
    const xo = x * dt * speed;
    const yo = y * dt * speed;
    pos.x += xo;
    pos.y += yo;
    pos.y += Math.sin((t + speed) * 10) * speed * dt;

    entity.frame.x = ((t / 0.1) | 0) % 2 + 3;
  }
}
