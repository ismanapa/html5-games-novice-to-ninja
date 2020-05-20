import { UpdateBehaviour } from '~gamelib';
import { Baddie } from './Baddie';

export class BaddieBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Baddie): void {
    const { pos, xSpeed, ySpeed } = entity;
    pos.x += xSpeed * dt;
    pos.y += ySpeed * dt;
  }
}
