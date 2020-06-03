import {
  Container, Camera, Game, KeyControls, Text, TileSprite, Texture, Coordinates, math,
} from '~gamelib';

import { Level } from '../Level';
import { Squizz } from '../entities/Squizz';
import { Baddie } from '../entities/Baddie';
import { Cloud } from '../entities/Cloud';
import { Pickup, PickupTypes } from '../entities/Pickup';
import { GameScreenBehaviour } from './GameScreenBehaviour';
import { Jackpot } from '../entities/Jackpot';

import SquizzTexture from '../res/images/player-walk.png';
import JackpotsTexture from '../res/images/jackpots.png';

const textures = {
  jackpots: new Texture(JackpotsTexture),
  squizz: new Texture(SquizzTexture),
};

export type GameStats = {
  pellets: number; maxPellets: number; lives: number; score: number; lettersHave: string;
};

export class GameScreen extends Container {
  baddies: Container;
  level: Level;
  camera: Camera;
  squizz: Squizz;
  gui: { complete: Text; score: Text; };
  stats: GameStats;
  livesIcons: TileSprite[];
  gameOver: (stast: GameStats) => void;
  pickups: Container;
  lastPickupAt: number;
  letters: TileSprite[];

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

    // Add roaming baddies
    this.baddies = this.addBaddies(level);

    // Refueling power-ups
    this.pickups = new Container();
    this.lastPickupAt = 0;

    camera.add(level);
    camera.add(this.pickups);
    camera.add(this.baddies);
    camera.add(squizz);

    // Add static graphic elements

    this.gui = this.createGUI(game);
    this.letters = this.createBonusLetters();

    this.stats = {
      pellets: 0,
      maxPellets: level.totalFreeSpots,
      lives: 3,
      score: 0,
      lettersHave: '',
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

  createBonusLetters() {
    return Jackpot.BONUS_WORD.split('').map((ch, i) => {
      const letter = this.add(new TileSprite(textures.jackpots, 32, 32));
      letter.frame.x = i;
      letter.pos = { x: 10, y: i * 32 + 128 };
      letter.scale = { x: 0.75, y: 0.75 };
      letter.visible = false;
      return letter;
    });
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
    this.addCloud(squizz.pos);

    stats.lives--;
    if (stats.lives === 0) {
      this.gameOver(stats);
    }
    this.updateLivesIcons();
  }

  addCloud(pos: Coordinates) {
    const { camera } = this;
    camera.add(new Cloud(pos));
  }

  addPickup() {
    const { stats, level, pickups } = this;
    const pickup = math.randOneFrom(Pickup.pickups);
    const p = pickups.add(new Pickup(pickup));
    if (pickup === PickupTypes.death) {
      // One less cell that user can possibly fill
      stats.maxPellets--;
      p.life *= 3; // death stays for a long time.
    }
    p.pos = level.getRandomPos();
  }

  addBonusLetter() {
    const { level, pickups } = this;
    const p = pickups.add(new Jackpot());
    p.pos = level.getRandomPos();
  }

  pickupBonusLetter(letter: string) {
    const { stats, letters } = this;
    if (stats.lettersHave.indexOf(letter) !== -1) {
      // Already have this letter
      return;
    }
    stats.lettersHave += letter;
    letters[Jackpot.BONUS_WORD.indexOf(letter)].visible = true;
    if (stats.lettersHave.length === Jackpot.BONUS_WORD.length) {
      // FREE LIFE!
      stats.lives += 1;
      stats.lettersHave = '';
      letters.forEach(l => (l.visible = false));
      this.updateLivesIcons();
    }
  }
}
