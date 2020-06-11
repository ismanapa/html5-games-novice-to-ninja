import {
  Container, Game, KeyControls, UpdateBehaviour, ContainerUpdateBehaviour, entity,
} from '~gamelib';

import { Level } from './Level';
import { Player } from './entities/Player';
import { Pickup } from './entities/Pickup';

export class GameScreen extends Container {
  gameMap: Level;
  player: Player;
  pickups: Container;

  constructor(game: Game, controls: KeyControls) {
    super();
    this.w = game.w;
    this.h = game.h;
    const map = new Level(game.w, game.h);
    const player = new Player(controls, map);
    player.pos.x = 48;
    player.pos.y = 48;

    this.gameMap = this.add(map);
    this.pickups = this.add(new Container());
    this.player = this.add(player);

    this.updateBehaviour = new GameBehaviour();

    this.populate();
  }

  populate() {
    const { pickups, gameMap } = this;
    for (let i = 0; i < 5; i++) {
      const p = pickups.add(new Pickup());
      p.pos = gameMap.findFreeSpot();
    }
  }
}

class GameBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, game: GameScreen): void {
    super.update(dt, t, game);

    const { player, pickups } = game;
    // Collect pickup!
    entity.hits(player, pickups, p => {
      p.dead = true;
      if (pickups.children.length === 1) {
        game.populate();
      }
    });
  }
}
