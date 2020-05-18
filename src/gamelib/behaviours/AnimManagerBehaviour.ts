import { UpdateBehaviour } from './UpdateBehaviour';
import { AnimManager } from '~gamelib/AnimManager';

export class AnimManagerBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: AnimManager): void {
    const { current, anims, frameSource } = entity;
    if (!current) {
      return;
    }
    const anim = anims[current];
    anim.update(dt);

    // Sync the tileSprite frame
    frameSource.x = anim.frame.x;
    frameSource.y = anim.frame.y;
  }
}
