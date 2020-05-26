import {
  UpdateBehaviour, ContainerUpdateBehaviour, entity as entityHelpers, math,
} from '~gamelib';
import { GameScreen } from './GameScreen';
import { Baddie } from '../entities/Baddie';

const SCORE_PELLET = 8;

export class GameScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: GameScreen): void {
    super.update(dt, t, entity);
    const { squizz, level, stats } = entity;

    // Make this game harder the longer you play
    squizz.minSpeed -= 0.005 * dt;
    squizz.speed -= 0.004 * dt;


    entity.baddies.children.forEach((b: Baddie) => {
      const { pos } = b;
      if (entityHelpers.distance(squizz, b) < 32) {
        // A hit!
        entity.loseLife();

        // Send off screen for a bit
        if (b.xSpeed) pos.x = -level.w;
        else pos.y = -level.h;
      }

      // Screen wrap
      if (pos.x > level.w) pos.x = -32;
      if (pos.y > level.h) pos.y = -32;
    });

    // Confine player to the level bounds
    const { pos } = squizz;
    const {
      bounds: {
        top, bottom, left, right,
      },
    } = level;
    pos.x = math.clamp(pos.x, left, right);
    pos.y = math.clamp(pos.y, top, bottom);

    // See if we're on new ground
    const ground = level.checkGround(entityHelpers.center(squizz));
    if (ground === 'solid') {
      stats.pellets++;
      entity.addScore(SCORE_PELLET);
    }
    if (ground === 'cleared' && !squizz.isPoweredUp) {
      entity.loseLife();
    }

    level.blank.y = squizz.isPoweredUp && ((t / 100) % 2) | 0 ? 1 : 0;
  }
}
