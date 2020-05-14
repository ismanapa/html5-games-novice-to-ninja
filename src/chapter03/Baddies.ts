import {
  Container, Sprite, Texture, Coordinates, UpdateBehaviour,
} from '~gamelib';

import baddieImg from './res/images/baddie.png';

class BaddieBehaviour implements UpdateBehaviour {
  speed: number;

  constructor(speed: number) {
    this.speed = speed;
  }

  update(dt: number, t: number, entity: Sprite): void {
    entity.setPos({ ...entity.pos, x: entity.pos.x + this.speed * dt });
  }
}


export class Baddies extends Container {
  spawnBaddie(pos: Coordinates, speed: number) {
    const baddie = new Sprite(new Texture(baddieImg));
    baddie.setPos(pos);
    baddie.updateBehaviour = new BaddieBehaviour(speed);
    this.add(baddie);
  }
}
