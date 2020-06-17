import { UpdateBehaviour } from '~gamelib';
import { Bullet } from './Bullet';


export class BulletBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Bullet): void {
    const { pos, speed, dir } = entity;

    // Move in the direction of the path
    pos.x += speed * dt * dir.x;
    pos.y += speed * dt * dir.y;

    if ((entity.life -= dt) < 0) {
      entity.dead = true;
    }
  }
}
