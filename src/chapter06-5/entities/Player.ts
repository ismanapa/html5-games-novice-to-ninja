import {
  TileSprite, Texture, KeyControls, Vec,
} from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';
import { PlayerBehaviour } from './PlayerBehaviour';
import { Level } from '../Level';

const texture = new Texture(tiles);

export class Player extends TileSprite {
  controls: KeyControls;
  speed: number;
  map: Level;
  gameOver: boolean;
  falling: boolean;

  constructor(controls: KeyControls, map: Level) {
    super(texture, 48, 48);
    this.controls = controls;
    this.map = map;
    this.frame.x = 4;
    this.hitBox = {
      x: 8,
      y: 10,
      w: 28,
      h: 38,
    };
    this.anchor = {
      x: 0,
      y: 0,
    };

    this.vel = new Vec();
    this.acc = new Vec();

    this.falling = true;

    this.updateBehaviour = new PlayerBehaviour();
  }
}
