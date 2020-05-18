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

  constructor(controls: KeyControls) {
    super(texture, 32, 32);
    this.controls = controls;
    this.updateBehaviour = new SquizzBehaviour();

    const { anims } = this;
    anims.add(SquizzAnimations.walk, [0, 1, 2, 3].map(x => ({ x, y: 0 })), 0.1);
    anims.play(SquizzAnimations.walk);

    this.speed = 0.15;
    this.dir = {
      x: 1,
      y: 0,
    };
    this.nextCell = this.speed;
  }
}
