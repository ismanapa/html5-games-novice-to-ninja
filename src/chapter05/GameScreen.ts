import { Container, Game, KeyControls } from '~gamelib';

import { Level } from './Level';
import { Player } from './entities/Player';

export class GameScreen extends Container {
  gameMap: Level;
  player: Player;

  constructor(game: Game, controls: KeyControls) {
    super();
    this.w = game.w;
    this.h = game.h;
    const map = new Level(game.w, game.h);
    const player = new Player(controls, map);
    player.pos.x = 48;
    player.pos.y = 48;

    this.gameMap = this.add(map);
    this.player = this.add(player);
  }
}
