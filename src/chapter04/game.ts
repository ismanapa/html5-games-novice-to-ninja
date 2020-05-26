import {
  Game,
  KeyControls,
} from '~gamelib';
import { GameScreen } from './entities/GameScreen';

const game = new Game(640, 480);
const controls = new KeyControls();

game.scene = new GameScreen(game, controls);
game.run();
