import {
  Container, Game, KeyControls, UpdateBehaviour, ContainerUpdateBehaviour, entity, math, State, Text,
} from '~gamelib';

import { Level } from './Level';
import { Player } from './entities/Player';
import { Pickup } from './entities/Pickup';
import { Bat } from './entities/Bat';
import { Totem } from './entities/Totem';

enum GameState {
  READY,
  PLAYING,
  GAMEOVER
}

export class GameScreen extends Container {
  gameMap: Level;
  player: Player;
  pickups: Container;
  baddies: Container;
  controls: KeyControls;
  onGameOver: () => void;
  state: State<GameState>;
  score: number;
  scoreText: Text;

  constructor(game: Game, controls: KeyControls, onGameOver: () => void) {
    super();
    this.w = game.w;
    this.h = game.h;
    this.controls = controls;
    this.onGameOver = onGameOver;
    const map = new Level(game.w, game.h);
    const player = new Player(controls, map);
    player.pos = map.findFreeSpot();
    player.pos.y -= 1;

    this.state = new State(GameState.READY);

    this.gameMap = this.add(map);
    this.pickups = this.add(new Container());
    this.player = this.add(player);

    const baddies = this.add(new Container());
    for (let i = 0; i < 5; i++) {
      this.randoBat(baddies.add(new Bat(player)));
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
    this.score = 0;
    this.scoreText = this.add(
      new Text('0', {
        font: "40pt 'Luckiest Guy', san-serif",
        fill: '#fff',
        align: 'center',
      }),
    );
    this.scoreText.pos = { x: game.w / 2, y: game.h / 2 - 40 };
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
    const {
      controls, baddies, player, pickups, state,
    } = game;

    switch (state.get()) {
      case GameState.READY:
        if (state.first) {
          game.scoreText.text = 'GET READY';
        }
        if (state.time > 2) {
          game.scoreText.text = '0';
          state.set(GameState.PLAYING);
        }
        break;

      case GameState.PLAYING:
        super.update(dt, t, game);
        this.updatePlaying(game);
        break;

      case GameState.GAMEOVER:
        if (state.first) {
          player.gameOver = true;
          game.scoreText.text = `DEAD. Score: ${game.score}`;
        }
        super.update(dt, t, game);

        // If player dead, wait for space bar
        if (player.gameOver && controls.action) {
          game.onGameOver();
        }
        break;
    }

    state.update(dt);
  }

  updatePlaying(game: GameScreen) {
    const { baddies, player, pickups, state } = game;
    baddies.map(baddie => {
      if (entity.hit(player, baddie)) {
        state.set(GameState.GAMEOVER);
        baddie.dead = true;
      }
    });

    // Collect pickup!
    entity.hits(player, pickups, p => {
      p.dead = true;
      game.score++;
      if (pickups.children.length === 1) {
        game.populate();
        game.score += 5;
      }
      game.scoreText.text = game.score.toString();
    });
  }
}
}
