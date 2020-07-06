import { UpdateBehaviour, math } from '~gamelib';
import { Totem } from './Totem';


export class TotemBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Totem): void {
    if (math.randOneIn(250)) {
      entity.fireIn = 1;
    }
    if (entity.fireIn > 0) {
      entity.fireIn -= dt;
      // Telegraph to the player
      entity.frame.x = [1, 0][((t / 0.1) | 0) % 2];
      if (entity.fireIn < 0) {
        entity.fireAtTarget();
      }
    }
  }
}
