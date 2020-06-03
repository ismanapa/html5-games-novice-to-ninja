import {
  Sprite, Coordinates, Texture, UpdateBehaviour, math,
} from '~gamelib';

import cloud from '../res/images/cloud.png';

export class Cloud extends Sprite {
  life: number;

  constructor(pos: Coordinates, life = 1) {
    super(new Texture(cloud));
    this.life = life;
    this.setPos(pos);

    this.updateBehaviour = new CloudBehaviour();
  }
}

class CloudBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Cloud): void {
    entity.pos.x += math.randf(-1, 1);
    entity.pos.y += math.randf(-1, 1);

    entity.life -= dt;

    if (entity.life < 0) {
      entity.dead = true;
    }
  }
}
