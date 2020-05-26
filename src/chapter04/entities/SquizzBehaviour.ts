import { UpdateBehaviour } from '~gamelib';
import { Squizz } from './Squizz';
import { TileSpriteBehaviour } from '~gamelib/behaviours/TileSpriteBehaviour';

export class SquizzBehaviour extends TileSpriteBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Squizz): void {
    super.update(dt, t, entity);

    const {
      pos, controls, speed, dir, minSpeed,
    } = entity;
    super.update(dt, t, entity);

    entity.nextCell -= dt;
    if (entity.nextCell <= 0) {
      entity.nextCell += speed;
      const { x, y } = controls;
      if (x && x !== dir.x) {
        dir.x = x;
        dir.y = 0;
        pos.y = Math.round(pos.y / 32) * 32;
      } else if (y && y !== dir.y) {
        dir.x = 0;
        dir.y = y;
        pos.x = Math.round(pos.x / 32) * 32;
      }
    }

    // Speed adjustments
    if (entity.speed > minSpeed) {
      entity.speed -= dt;
    }

    pos.x += dir.x * dt * (32 / speed);
    pos.y += dir.y * dt * (32 / speed);
  }
}
