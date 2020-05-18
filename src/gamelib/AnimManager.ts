import { Coordinates } from './types';
import { TileSprite } from './entities/TileSprite';
import { Entity } from './entities/Entity';
import { AnimManagerBehaviour } from './behaviours/AnimManagerBehaviour';
import { AnimBehaviour } from './behaviours/AnimBehaviour';

export class Anim extends Entity {
  frames: Coordinates[];
  rate: number;
  frame: Coordinates;
  curFrame: number;
  curTime: number;

  constructor(frames: Coordinates[], rate: number) {
    super();
    this.frames = frames;
    this.rate = rate;
    this.updateBehaviour = new AnimBehaviour();
    this.reset();
  }

  reset() {
    [this.frame] = this.frames;
    this.curFrame = 0;
    this.curTime = 0;
  }
}

export class AnimManager extends Entity {
  anims: { [key: string]: Anim };
  running: boolean;
  frameSource: Coordinates;
  current: string;

  constructor(e: TileSprite) {
    super();
    this.anims = {};
    this.running = false;
    this.frameSource = e.frame;
    this.current = null;

    this.updateBehaviour = new AnimManagerBehaviour();
  }

  add(name: string, frames: Coordinates[], speed: number) {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }

  play(anim: string) {
    const { current, anims } = this;
    if (anim === current) {
      return;
    }
    this.current = anim;
    anims[anim].reset();
  }

  stop() {
    this.current = null;
  }
}
