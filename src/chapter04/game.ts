import {
  Game,
  KeyControls,
} from '~gamelib';

import { GameScreen } from './screens/GameScreen';
import { LogoScreen } from './screens/LogoScreen';
import { TitleScreen } from './screens/TitleScreen';

const game = new Game(640, 480);
const controls = new KeyControls();

const titleScreen = () => {
  game.scene = new TitleScreen(game, controls, newGame);
};

const newGame = () => {
  game.scene = new GameScreen(game, controls);
};

game.scene = new LogoScreen(titleScreen);
game.run();
