import {
  Container, Camera, Game, KeyControls,
} from '~gamelib';
import { Level } from '~chapter04/Level';
import { Squizz } from './Squizz';
import { Baddie } from './Baddie';
import { GameScreenBehaviour } from './GameScreenBehaviour';

export class GameScreen extends Container {
  baddies: Container;
  level: Level;
  camera: Camera;
  squizz: Squizz;

  constructor(game: Game, controls: KeyControls) {
    super();

    const level = new Level(game.w * 2, game.h * 2);
    const squizz = new Squizz(controls);
    squizz.pos = { x: level.w / 2, y: level.h / 2 };

    const camera = this.add(
      new Camera(
        squizz,
        { w: game.w, h: game.h },
        { w: level.w, h: level.h },
      ),
    ) as Camera;

    this.baddies = this.addBaddies(level);

    camera.add(level);
    camera.add(this.baddies);
    camera.add(squizz);

    this.level = level;
    this.camera = camera;
    this.squizz = squizz;

    this.updateBehaviour = new GameScreenBehaviour();
  }

  addBaddies(lev: Level) {
    const baddies = new Container();
    // Horizontal bad guys
    for (let i = 0; i < 5; i++) {
      const b = baddies.add(new Baddie(32 * 5, 0));
      b.pos.y = Math.floor(lev.h / 5) * i + lev.tileH * 2;
    }
    // Vertical bad guys
    for (let i = 0; i < 10; i++) {
      const b = baddies.add(new Baddie(0, 32 * 5));
      b.pos.x = Math.floor(lev.w / 10) * i + lev.tileW;
    }
    return baddies;
  }
}
