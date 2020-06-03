import { TileSprite, Texture, Coordinates, UpdateBehaviour } from '~gamelib';

import pickup from '../res/images/pickups.png';

type PickUp = {
  frames: [number, number][];
  life: number;
};

type PickUpCollection = {
  [key: string]: PickUp
};

const pickups: PickUpCollection = {
  bomb: { frames: [[3, 0], [3, 1]], life: 10 },
  death: { frames: [[0, 0], [1, 0]], life: 30 },
  shoes: { frames: [[1, 1]], life: 10 },
};

export const PickupTypes = {
  bomb: 'bomb',
  death: 'death',
  shoes: 'shoes',
  jackpots: 'jackpots',
};

export class Pickup extends TileSprite {
  name: string;
  frames: Coordinates[];
  liveForever: boolean;
  life: number;
  speed: number;
  static pickups: string[];

  constructor(name: string) {
    super(new Texture(pickup), 32, 32);
    this.name = name;
    this.frames = pickups[name].frames.map(([x, y]) => ({ x, y }));
    this.liveForever = false;
    this.life = pickups[name].life;
    this.speed = 100;

    this.updateBehaviour = new PickUpBehaviour();
  }
}

class PickUpBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Pickup): void {
    const { frames, speed, liveForever } = entity;
    entity.frame = frames[Math.floor(t / speed) % frames.length];

    if (liveForever) return;

    entity.life -= dt;
    const { life } = entity;
    if (life < 2) {
      entity.visible = !!((t / 0.1 | 0) % 2);
    }
    if (life < 0) {
      entity.dead = true;
    }
  }
}

Pickup.pickups = Object.keys(pickups);
