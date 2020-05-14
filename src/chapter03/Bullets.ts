import {
  Container,
  Coordinates,
  Sprite,
  UpdateBehaviour,
  Texture,
  ContainerUpdateBehaviour,
} from '~gamelib';

import bulletImg from './res/images/bullet.png';

class BulletBehaviour implements UpdateBehaviour {
  speed: number;

  constructor(speed: number) {
    this.speed = speed;
  }

  update(dt: number, t: number, entity: Sprite): void {
    entity.setPos({ ...entity.pos, x: entity.pos.x + this.speed * dt });
  }
}

class BulletsContainerBehaviour extends ContainerUpdateBehaviour {
  w: number;

  constructor(w: number) {
    super();
    this.w = w;
  }

  update(dt: number, t: number, entity: Bullets): void {
    super.update(dt, t, entity);

    entity.children.forEach(bullet => {
      if (bullet.pos.x > this.w + 20) {
        bullet.setIsDead(true);
      }
    });
  }
}

const getRandomSpeed = (): number => Math.ceil(Math.random() * 600 + 300);

export class Bullets extends Container {
  w: number;

  constructor(w: number) {
    super();
    this.w = w;
    this.updateBehaviour = new BulletsContainerBehaviour(w);
  }

  addBullet(pos: Coordinates) {
    const bullet = new Sprite(new Texture(bulletImg));
    bullet.pos = pos;
    bullet.updateBehaviour = new BulletBehaviour(getRandomSpeed());
    this.add(bullet);
  }
}
