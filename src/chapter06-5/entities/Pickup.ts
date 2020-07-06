import { TileSprite, Texture } from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';

const texture = new Texture(tiles);

export class Pickup extends TileSprite {
  constructor() {
    super(texture, 48, 48);
    this.hitBox = {
      x: 2,
      y: 22,
      w: 44,
      h: 26,
    };
    this.frame.x = 5;
    this.frame.y = 2;
  }
}
