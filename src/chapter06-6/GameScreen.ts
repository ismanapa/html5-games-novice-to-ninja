import {
  Container, KeyControls, Game, Text, math, ContainerUpdateBehaviour, UpdateBehaviour,
} from '~gamelib';

import { CrashTestDummy } from './entities/CrashTestDummy';

export class GameScreen extends Container {
  controls: KeyControls;
  ctd: CrashTestDummy;
  timer: Text;
  time: number;
  running: boolean;
  bounds: { x: number; y: number; w: number; h: number; };
  balls: Container;

  constructor(game: Game, controls: KeyControls) {
    super();
    this.w = game.w;
    this.h = game.h;
    this.controls = controls;

    this.bounds = { x: 0, y: 0, w: this.w, h: this.h };

    this.balls = this.add(new Container());
    for (let i = 0; i < 40; i++) {
      const b = this.balls.add(new CrashTestDummy(this.bounds));
      b.pos.set(math.rand(32, this.w - 64), math.rand(32, this.h - 64));
    }

    this.updateBehaviour = new GameScreenBehaviour();
  }
}


class GameScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: GameScreen): void {
    super.update(dt, t, entity);

    const balls = entity.balls.children;
    for (let i = 0; i < balls.length; i++) {
      const a = balls[i] as CrashTestDummy;

      for (let j = i + 1; j < balls.length; j++) {
        const b = balls[j] as CrashTestDummy;
        const diff = b.pos.clone().subtract(a.pos);
        if (diff.mag() > a.radius + b.radius) {
          continue;
        }
        const mid = a.pos.clone().add(b.pos).divide(2);
        const normal = diff.normalize();

        a.pos.set(mid.x - normal.x * a.radius, mid.y - normal.y * a.radius);
        b.pos.set(mid.x + normal.x * b.radius, mid.y + normal.y * a.radius);

        let power = (a.vel.x - b.vel.x) * normal.x;
        power += (a.vel.y - b.vel.y) * normal.y;

        const displacement = normal.multiply(power);
        a.vel.subtract(displacement);
        b.vel.add(displacement);
      }
    }
  }
}
