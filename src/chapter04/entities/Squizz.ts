import {
  TileSprite, Texture, KeyControls, Coordinates,
} from '~gamelib';

import { SquizzBehaviour } from './SquizzBehaviour';

import PlayerSprite from '../res/images/player-walk.png';

const texture = new Texture(PlayerSprite);

export const SquizzAnimations = {
  walk: 'walk',
  power: 'power',
};

export class Squizz extends TileSprite {
  controls: KeyControls;
  speed: number;
  dir: Coordinates;
  nextCell: number;
  minSpeed: number;
  fastTime: number;
  powerupTime: number;

  constructor(controls: KeyControls) {
    super(texture, 32, 32);
    this.controls = controls;
    this.updateBehaviour = new SquizzBehaviour();

    const { anims } = this;
    anims.add(SquizzAnimations.walk, [0, 1, 2, 3].map(x => ({ x, y: 0 })), 0.1);
    anims.add(SquizzAnimations.power, [0, 1, 2, 3].map(x => ({ x, y: 1 })), 0.07);

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
    this.powerupTime = 0;
    this.fastTime = 0;
    this.anims.play(SquizzAnimations.walk);
  }

  powerUpFor(seconds = 3) {
    this.powerupTime = seconds;
    this.anims.play(SquizzAnimations.power);
  }

  get isPoweredUp() {
    return this.powerupTime > 0;
  }
}
