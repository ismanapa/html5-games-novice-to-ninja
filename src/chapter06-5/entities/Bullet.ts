import {
  Texture, TileSprite, math, Coordinates,
} from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';
import { BulletBehaviour } from './BulletBehaviour';

const texture = new Texture(tiles);

export class Bullet extends TileSprite {
  speed: number;
  dir: Coordinates;
  life: number;

  constructor(dir: Coordinates, speed = 100) {
    super(texture, 48, 48);
    this.hitBox = {
      x: 24,
      y: 12,
      w: 24,
      h: 26,
    };
    this.frame.x = 4;
    this.frame.y = 2;
    this.pivot.x = 24;
    this.pivot.y = 24;
    this.speed = speed;
    this.dir = dir;
    this.life = 3;
    this.rotation = math.angle(dir, { x: 0, y: 0 });
    this.updateBehaviour = new BulletBehaviour();
  }
}
