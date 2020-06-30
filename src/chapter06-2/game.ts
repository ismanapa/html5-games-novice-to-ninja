import { Game, KeyControls } from '~gamelib';

import { GameScreen } from './GameScreen';

const game = new Game(800, 150);
const keys = new KeyControls();
function startGame() {
  game.scene = new GameScreen(game, keys);
}
startGame();
game.run();
