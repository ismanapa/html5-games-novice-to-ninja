import {
  Container, Game, KeyControls, UpdateBehaviour,
  ContainerUpdateBehaviour, entity, math, State, Text, Camera, Vec,
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
  camera: Camera;
  bats: Container;

  constructor(game: Game, controls: KeyControls, onGameOver: () => void) {
    super();
    this.w = game.w;
    this.h = game.h;
    this.controls = controls;
    this.onGameOver = onGameOver;
    this.state = new State(GameState.READY);

    // Map, player, camera
    const map = new Level();
    const player = new Player(controls, map);
    player.pos.x = map.spawns.player.x;
    player.pos.y = map.spawns.player.y;


    const camera = new Camera(
      player,
      { w: game.w, h: game.h },
      { w: map.w, h: map.h },
    );
    this.camera = this.add(camera);
    this.gameMap = camera.add(map);
    this.pickups = camera.add(new Container());
    this.player = camera.add(player);

    // Bats
    const bats = new Container();
    map.spawns.bats.forEach(({ x, y }) => {
      const bat = bats.add(new Bat(player));
      bat.pos.x = x;
      bat.pos.y = y;
    });
    this.bats = camera.add(bats);

    // Totems
    map.spawns.totems.forEach(({ x, y }) => {
      const t = camera.add(new Totem(player, b => bats.add(b)));
      t.pos.x = x;
      t.pos.y = y;
    });

    // Pickups
    this.populate();

    // Score
    this.score = 0;
    this.scoreText = this.add(
      new Text('0', {
        font: "40pt 'Luckiest Guy', san-serif",
        fill: '#fff',
        align: 'center',
      }),
    );
    this.scoreText.pos = { x: game.w / 2, y: game.h / 2 - 40 } as Vec;

    this.updateBehaviour = new GameBehaviour();
  }

  populate() {
    const { pickups, gameMap } = this;
    for (let i = 0; i < 5; i++) {
      const p = pickups.add(new Pickup());
      p.pos = gameMap.findTreasureSpot() as Vec;
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
      controls, player, state,
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
    const {
      bats, player, pickups, state,
    } = game;
    bats.map(bat => {
      if (entity.hit(player, bat)) {
        state.set(GameState.GAMEOVER);
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
