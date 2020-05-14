import { Sprite, Texture, Coordinates } from '~gamelib';

import spaceship from './res/images/spaceship.png';
import { ShipUpdateBehaviour } from './SpaceshipBehaviour';

export class Spaceship extends Sprite {
  constructor(pos: Coordinates, updateBehaviour: ShipUpdateBehaviour) {
    super(new Texture(spaceship));
    this.pos = pos;
    this.updateBehaviour = updateBehaviour;
  }
}
