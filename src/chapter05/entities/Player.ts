import {
  TileSprite, Texture, KeyControls,
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

  constructor(controls: KeyControls, map: Level) {
    super(texture, 48, 48);
    this.controls = controls;
    this.speed = 210;
    this.anchor = { x: 0, y: 0 };
    this.map = map;
    this.hitBox = {
      x: 8,
      y: 10,
      w: 28,
      h: 38,
    };
    this.gameOver = false;

    this.updateBehaviour = new PlayerBehaviour();
  }
}
