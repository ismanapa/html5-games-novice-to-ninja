import { UpdateBehaviour } from '~gamelib';
import { Squizz, SquizzAnimations } from './Squizz';
import { TileSpriteBehaviour } from '~gamelib/behaviours/TileSpriteBehaviour';

export class SquizzBehaviour extends TileSpriteBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Squizz): void {
    super.update(dt, t, entity);

    const {
      pos, controls, dir, minSpeed, anims,
    } = entity;
    let { speed } = entity;

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

    if ((entity.fastTime -= dt) > 0) {
      speed /= 1.33;
    }

    pos.x += dir.x * dt * (32 / speed);
    pos.y += dir.y * dt * (32 / speed);

    // Powerball blink mode!
    entity.visible = true;
    if (entity.powerupTime > 0) {
      const time = entity.powerupTime -= dt;
      // Blink when nearly done
      if (time < 1.5) {
        entity.visible = !!(t / 0.1 % 2 | 0);
      }
      if (time < 0) {
        anims.play(SquizzAnimations.walk);
      }
    }
  }
}
