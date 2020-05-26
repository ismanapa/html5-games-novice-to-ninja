import {
  Game,
  KeyControls,
} from '~gamelib';

import { GameScreen, GameStats } from './screens/GameScreen';
import { LogoScreen } from './screens/LogoScreen';
import { TitleScreen } from './screens/TitleScreen';
import { GameOverScreen } from './screens/GameOverScreen';

const game = new Game(640, 480);
const controls = new KeyControls();

const titleScreen = () => {
  game.scene = new TitleScreen(game, controls, newGame);
};

const gameOverScreen = (result: GameStats) => {
  game.scene = new GameOverScreen(game, controls, result, titleScreen);
};

const newGame = () => {
  game.scene = new GameScreen(game, controls, gameOverScreen);
};

game.scene = new LogoScreen(titleScreen);
game.run();
