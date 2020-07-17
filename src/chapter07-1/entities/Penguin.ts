import { Bodies, Body } from 'matter-js';
import {
  TileSprite, Vec, Texture, UpdateBehaviour, SoundGroup, Sound,
} from '~gamelib';

import tiles from '../res/images/pengolfuin.png';
import squawk1 from '../res/sounds/squawk1.mp3';
import squawk2 from '../res/sounds/squawk2.mp3';
import squawk3 from '../res/sounds/squawk3.mp3';
import squawk4 from '../res/sounds/squawk4.mp3';
import squawk5 from '../res/sounds/squawk5.mp3';

const texture = new Texture(tiles);
const squawk = new SoundGroup([
  new Sound(squawk1, { volume: 0.7 }),
  new Sound(squawk2, { volume: 0.7 }),
  new Sound(squawk3, { volume: 0.7 }),
  new Sound(squawk4, { volume: 0.7 }),
  new Sound(squawk5, { volume: 0.7 })
]);

export class Penguin extends TileSprite {
  body: Body;
  lastSquawk: number;

  constructor(pos: Vec) {
    super(texture, 32, 32);
    this.pivot.x = this.w / 2;
    this.pivot.y = this.h / 2;
    this.anchor = Vec.from(this.pivot as Vec).multiply(-1);

    this.body = Bodies.circle(pos.x, pos.y, 10, {
      restitution: 0.7,
    });

    this.body.torque = 0.002;
    this.lastSquawk = Date.now();

    this.updateBehaviour = new PenguinBehaviour();
  }

  collide(speed: number) {
    const { lastSquawk } = this;
    if (speed > 1 && Date.now() - lastSquawk > 100) {
      // Play a squawk
      squawk.play();
      this.lastSquawk = Date.now();
    }
  }

  fire(angle: number, power: number) {
    const { body } = this;
    Body.applyForce(
      body,
      { x: body.position.x, y: body.position.y - 10 },
      { x: Math.cos(angle) * power, y: Math.sin(angle) * power },
    );
  }
}

class PenguinBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Penguin): void {
    const { pos, body } = entity;
    entity.rotation = body.angle;
    pos.copy(body.position as Vec);
  }
}
