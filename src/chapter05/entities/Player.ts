import { TileSprite, Texture, KeyControls } from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';
import { PlayerBehaviour } from './PlayerBehaviour';

const texture = new Texture(tiles);

export class Player extends TileSprite {
  controls: KeyControls;
  speed: number;

  constructor(controls: KeyControls) {
    super(texture, 48, 48);
    this.controls = controls;
    this.speed = 210;
    this.anchor = { x: 0, y: 0 };

    this.updateBehaviour = new PlayerBehaviour();
  }
}
