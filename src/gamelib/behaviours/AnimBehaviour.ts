import { UpdateBehaviour } from './UpdateBehaviour';
import { Anim } from '~gamelib/AnimManager';

export class AnimBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Anim): void {
    const { rate, frames } = entity;
    entity.curTime += dt;
    if (entity.curTime > rate) {
      entity.curFrame++;
      entity.frame = frames[entity.curFrame % frames.length];
      entity.curTime -= rate;
    }
  }
}
