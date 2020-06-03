import {
  UpdateBehaviour, ContainerUpdateBehaviour, entity as entityHelpers, math,
} from '~gamelib';
import { GameScreen } from './GameScreen';
import { Baddie } from '../entities/Baddie';
import { PickupTypes, Pickup } from '../entities/Pickup';
import { Jackpot } from '~chapter04/entities/Jackpot';

const SCORE_BADDIES = 999;
const SCORE_PELLET = 8;
const SCORE_JACKPOT = 51;
const SCORE_POWERBALL = 42;

export class GameScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: GameScreen): void {
    super.update(dt, t, entity);
    const { squizz, level, stats } = entity;

    // Make this game harder the longer you play
    squizz.minSpeed -= 0.005 * dt;
    squizz.speed -= 0.004 * dt;

    // Update game containers
    this.updatePickups(t, entity);

    entity.baddies.children.forEach((b: Baddie) => {
      const { pos } = b;
      if (entityHelpers.distance(squizz, b) < 32) {
        // A hit!
        entity.addCloud(pos);
        entity.addScore(SCORE_BADDIES);

        if (!squizz.isPoweredUp) {
          entity.loseLife();
        }

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

    // Flash the background if in powerup mode
    level.blank.y = squizz.isPoweredUp && ((t / 100) % 2) | 0 ? 1 : 0;
  }

  updatePickups(t: number, entity: GameScreen) {
    const { squizz, lastPickupAt } = entity;

    // Check for collisions
    entity.pickups.map((p: Pickup | Jackpot) => {
      if (entityHelpers.distance(squizz, p) < 32) {
        switch (p.name) {
          case PickupTypes.jackpots:
            entity.pickupBonusLetter((p as Jackpot).letter);
            entity.addScore(SCORE_JACKPOT);
            break;
          case PickupTypes.bomb:
            squizz.powerUpFor(4);
            entity.addScore(SCORE_POWERBALL);
            break;
          case PickupTypes.shoes:
            squizz.fastTime = 3;
            break;
          case PickupTypes.death:
            entity.loseLife();
        }
        p.dead = true;
      }
    });

    // Add new pickup item
    if (t - lastPickupAt > 1) {
      entity.lastPickupAt = t;
      entity.addPickup();
      // ... and maybe a bonus letter
      if (math.randOneIn(3)) {
        entity.addBonusLetter();
      }
    }
  }
}
