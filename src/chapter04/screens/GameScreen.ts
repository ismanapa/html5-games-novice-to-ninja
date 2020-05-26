import {
  Container, Camera, Game, KeyControls, Text, TileSprite, Texture,
} from '~gamelib';
import { Level } from '~chapter04/Level';
import { Squizz } from '../entities/Squizz';
import { Baddie } from '../entities/Baddie';
import { GameScreenBehaviour } from './GameScreenBehaviour';

import SquizzTexture from '../res/images/player-walk.png';

const textures = {
  squizz: new Texture(SquizzTexture),
};

export type GameStats = { pellets: number; maxPellets: number; lives: number; score: number; };

export class GameScreen extends Container {
  baddies: Container;
  level: Level;
  camera: Camera;
  squizz: Squizz;
  gui: { complete: Text; score: Text; };
  stats: GameStats;
  livesIcons: TileSprite[];
  gameOver: (stast: GameStats) => void;

  constructor(game: Game, controls: KeyControls, gameOver: (stast: GameStats) => void) {
    super();
    this.gameOver = gameOver;

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

    this.gui = this.createGUI(game);

    this.stats = {
      pellets: 0,
      maxPellets: level.totalFreeSpots,
      lives: 3,
      score: 0,
    };

    this.updateLivesIcons();

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

  createGUI(game: Game) {
    const font = { font: "28pt 'VT323', monospace", fill: '#5f0' };
    const complete = this.add(new Text('', font));
    const score = this.add(new Text('', ({ align: 'center', ...font })));
    complete.pos = { x: 20, y: 20 };
    score.pos = { x: game.w / 2, y: 20 };

    this.livesIcons = Array.from(new Array(4), (_, i) => {
      const icon = this.add(new TileSprite(textures.squizz, 32, 32));
      icon.pos = {
        x: game.w - 48,
        y: i * 48 + 180,
      };
      return icon;
    });

    return {
      complete,
      score,
    };
  }

  updateLivesIcons() {
    this.livesIcons.forEach((icon, i) => {
      icon.visible = i < this.stats.lives - 1;
    });
  }

  addScore(score: number) {
    const { stats, gui } = this;
    const complete = stats.pellets / stats.maxPellets * 100;

    stats.score += score;
    gui.score.text = stats.score.toString();
    gui.complete.text = `${complete.toFixed(1)}%`;
  }

  loseLife() {
    const { squizz, stats } = this;

    squizz.reset();

    stats.lives--;
    if (stats.lives === 0) {
      this.gameOver(stats);
    }
    this.updateLivesIcons();
  }
}
