import { Game, KeyControls } from '~gamelib';
import { GameScreen } from './GameScreen';

const game = new Game(48 * 19, 48 * 11);
game.scene = new GameScreen(game, new KeyControls());
game.run();
