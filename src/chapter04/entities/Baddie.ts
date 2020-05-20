import { TileSprite, Texture } from '~gamelib';

import baddieWalk from '../res/images/baddie-walk.png';
import { BaddieBehaviour } from './BaddieBehaviour';

const texture = new Texture(baddieWalk);

export class Baddie extends TileSprite {
  xSpeed: number;
  ySpeed: number;

  constructor(xSpeed: number, ySpeed: number) {
    super(texture, 32, 32);
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.updateBehaviour = new BaddieBehaviour();
  }
}