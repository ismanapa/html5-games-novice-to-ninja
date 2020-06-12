import {
  Container, Game, KeyControls, UpdateBehaviour, ContainerUpdateBehaviour, entity, math,
} from '~gamelib';

import { Level } from './Level';
import { Player } from './entities/Player';
import { Pickup } from './entities/Pickup';
import { Bat } from './entities/Bat';

export class GameScreen extends Container {
  gameMap: Level;
  player: Player;
  pickups: Container;
  bats: Container;

  constructor(game: Game, controls: KeyControls) {
    super();
    this.w = game.w;
    this.h = game.h;
    const map = new Level(game.w, game.h);
    const player = new Player(controls, map);
    player.pos = map.findFreeSpot();

    this.gameMap = this.add(map);
    this.pickups = this.add(new Container());
    this.player = this.add(player);

    const bats = this.add(new Container());
    for (let i = 0; i < 5; i++) {
      // this.randoBat(bats.add(new Bat(this.gameMap.findFreeSpot)));
      this.randoBat(bats.add(new Bat()));
    }
    this.bats = bats;
    console.log(this.bats);

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

  randoBat(bat: Bat) {
    bat.pos.x = this.w * math.randf(1, 2);
    bat.pos.y = math.rand(10) * 32;
    bat.speed = math.rand(150, 230);
    return bat;
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
