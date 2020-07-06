import {
  Container, KeyControls, Game, Text,
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

    const timer = this.add(
      new Text('0', {
        font: '20px sans-serif',
        fill: '#fff',
        align: 'center',
      }),
    );
    timer.pos.set(this.w / 2, 20);

    const bounds = {
      x: 0, y: 0, w: this.w, h: this.h,
    };
    this.ctd = this.add(new CrashTestDummy(bounds, t => timer.text = t.toString()));
    this.ctd.pos.y = this.h / 2;
  }
}
