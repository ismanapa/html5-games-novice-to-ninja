import {
  Container, Game, KeyControls, UpdateBehaviour, ContainerUpdateBehaviour, entity, math,
} from '~gamelib';

import { Level } from './Level';
import { Player } from './entities/Player';
import { Pickup } from './entities/Pickup';
import { Bat } from './entities/Bat';
import { Totem } from './entities/Totem';

export class GameScreen extends Container {
  gameMap: Level;
  player: Player;
  pickups: Container;
  baddies: Container;
  controls: KeyControls;
  onGameOver: () => void;

  constructor(game: Game, controls: KeyControls, onGameOver: () => void) {
    super();
    this.w = game.w;
    this.h = game.h;
    this.controls = controls;
    this.onGameOver = onGameOver;
    const map = new Level(game.w, game.h);
    const player = new Player(controls, map);
    player.pos = map.findFreeSpot();

    this.gameMap = this.add(map);
    this.pickups = this.add(new Container());
    this.player = this.add(player);

    const baddies = this.add(new Container());
    for (let i = 0; i < 5; i++) {
      this.randoBat(baddies.add(new Bat(map.findFreeSpot.bind(map))));
    }
    this.baddies = baddies;

    // Add a couple of Top-Hat Totems
    for (let i = 0; i < 2; i++) {
      const t = this.add(new Totem(player, b => baddies.add(b)));
      const { x, y } = map.findFreeSpot(false); // `false` means "NOT free"
      t.pos.x = x;
      t.pos.y = y;
    }

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

    const {
      controls, baddies, player, pickups,
    } = game;

    baddies.map(b => {
      if (entity.hit(player, b)) {
        player.gameOver = true;
      }
    });

    // If player dead, wait for space bar
    if (player.gameOver && controls.action) {
      game.onGameOver();
    }

    // Collect pickup!
    entity.hits(player, pickups, p => {
      p.dead = true;
      if (pickups.children.length === 1) {
        game.populate();
      }
    });
  }
}
