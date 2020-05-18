import { Coordinates } from './types';
import { TileSprite } from './entities/TileSprite';

class Anim {
  frames: Coordinates[];
  rate: number;
  frame: Coordinates;
  curFrame: number;
  curTime: number;

  constructor(frames: Coordinates[], rate: number) {
    this.frames = frames;
    this.rate = rate;
    this.reset();
  }

  reset() {
    [this.frame] = this.frames;
    this.curFrame = 0;
    this.curTime = 0;
  }

  update(dt: number) {
    const { rate, frames } = this;
    this.curTime += dt;
    if (this.curTime > rate) {
      this.curFrame++;
      this.frame = frames[this.curFrame % frames.length];
      this.curTime -= rate;
    }
  }
}

export class AnimManager {
  anims: { [key: string]: Anim };
  running: boolean;
  frameSource: Coordinates;
  current: string;

  constructor(e: TileSprite) {
    this.anims = {};
    this.running = false;
    this.frameSource = e.frame;
    this.current = null;
  }

  add(name: string, frames: Coordinates[], speed: number) {
    this.anims[name] = new Anim(frames, speed);
    return this.anims[name];
  }

  update(dt: number) {
    const { current, anims, frameSource } = this;
    if (!current) {
      return;
    }
    const anim = anims[current];
    anim.update(dt);

    // Sync the tileSprite frame
    frameSource.x = anim.frame.x;
    frameSource.y = anim.frame.y;
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
