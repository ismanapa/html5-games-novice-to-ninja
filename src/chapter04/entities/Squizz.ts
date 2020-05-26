import {
  TileSprite, Texture, KeyControls, Coordinates,
} from '~gamelib';

import PlayerSprite from '../res/images/player-walk.png';
import { SquizzBehaviour } from './SquizzBehaviour';

const texture = new Texture(PlayerSprite);

export const SquizzAnimations = {
  walk: 'walk',
};

export class Squizz extends TileSprite {
  controls: KeyControls;
  speed: number;
  dir: Coordinates;
  nextCell: number;
  minSpeed: number;
  isPoweredUp: boolean;

  constructor(controls: KeyControls) {
    super(texture, 32, 32);
    this.controls = controls;
    this.updateBehaviour = new SquizzBehaviour();
    this.isPoweredUp = false;

    const { anims } = this;
    anims.add(SquizzAnimations.walk, [0, 1, 2, 3].map(x => ({ x, y: 0 })), 0.1);

    this.minSpeed = 0.20;
    this.reset();

    this.speed = this.minSpeed;
    this.dir = {
      x: 1,
      y: 0,
    };
    this.nextCell = this.speed;
  }

  reset() {
    this.speed = this.minSpeed * 5;
    this.anims.play(SquizzAnimations.walk);
  }
}
