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

    const bounds = {
      x: 0, y: 0, w: this.w, h: this.h,
    };

    for (let i = 0; i < 30; i++) {
      this.add(new CrashTestDummy(bounds));
    }
  }
}
