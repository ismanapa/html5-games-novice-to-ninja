import { Game, KeyControls } from '~gamelib';
import { GameScreen } from './GameScreen';

const game = new Game(48 * 19, 48 * 11);
const keys = new KeyControls();

const startGame = () => {
  game.scene = new GameScreen(game, keys, startGame);
};

startGame();
game.run();
