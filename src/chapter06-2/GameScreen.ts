import {
  Container, KeyControls, Game, Text, ContainerUpdateBehaviour, UpdateBehaviour,
} from '~gamelib';

import { CrashTestDummy } from './entities/CrashTestDummy';

export class GameScreen extends Container {
  controls: KeyControls;
  ctd: CrashTestDummy;
  timer: Text;
  time: number;
  running: boolean;

  constructor(game: Game, controls: KeyControls) {
    super();
    this.w = game.w;
    this.h = game.h;
    this.controls = controls;

    const velocity = this.w / 3; // X seconds to cross the screen.
    this.ctd = this.add(new CrashTestDummy(velocity));
    this.ctd.pos.y = game.h / 2 - 10;

    this.timer = this.add(
      new Text('time', { font: '24px sans-serif', fill: '#fff', align: 'center' }),
    );
    this.timer.pos.set(this.w / 2, 20);

    this.updateBehaviour = new GameScreenBehaviour();

    this.reset();
  }

  reset() {
    this.time = 0;
    this.running = true;
    this.ctd.pos.x = 0;
  }
}

class GameScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: GameScreen): void {
    super.update(dt, t, entity);

    const {
      ctd, running, timer, w, controls,
    } = entity;

    if (ctd.pos.x >= w) {
      entity.running = false;
      ctd.pos.x -= w + 32;
    }

    if (running) {
      entity.time += dt;
      timer.text = `${entity.time.toFixed(3)} (${ctd.vel.x.toFixed(2)})`;
    }

    if (controls.action) {
      entity.reset();
    }
  }
}
