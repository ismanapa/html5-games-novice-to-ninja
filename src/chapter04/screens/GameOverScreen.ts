import {
  Container, Game, KeyControls, Text, Coordinates, ContainerUpdateBehaviour, UpdateBehaviour,
} from '~gamelib';
import { GameStats } from './GameScreen';
import { Level } from '~chapter04/Level';
import { hightScore } from '~chapter04/hightScore';

export class GameOverScreen extends Container {
  onStart: () => void;
  controls: KeyControls;

  constructor(game: Game, controls: KeyControls, stats: GameStats, onStart: () => void) {
    super();

    this.onStart = onStart;
    this.controls = controls;
    controls.reset();

    const drawText = (msg: string, pos: Coordinates, size = 24) => {
      const font = `${size}pt 'VT323', monospace`;
      const text = new Text(msg, { font, fill: '#111', align: 'center' });
      text.pos = pos;
      this.add(text);
    };

    this.add(new Level(game.w, game.h));

    const complete = (stats.pellets / stats.maxPellets * 100);
    if (stats.score > hightScore.bestScore) {
      hightScore.bestScore = stats.score;
    }
    if (complete > hightScore.bestComplete) {
      hightScore.bestComplete = complete;
    }

    drawText('GAME OVER', { x: game.w / 2, y: 120 }, 44);
    drawText(`Completed: ${complete.toFixed(1)}%`, { x: game.w / 2, y: 230 }, 30);
    drawText(`best: ${hightScore.bestComplete.toFixed(1)}%`, { x: game.w / 2, y: 260 });
    drawText(`Score: ${stats.score}`, { x: game.w / 2, y: 310 }, 30);
    drawText(`best: ${hightScore.bestScore}`, { x: game.w / 2, y: 340 });

    this.updateBehaviour = new GameOverScreenBehaviour();
  }
}


class GameOverScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: GameOverScreen) {
    super.update(dt, t, entity);

    if (entity.controls.action) {
      entity.onStart();
    }
  }
}
