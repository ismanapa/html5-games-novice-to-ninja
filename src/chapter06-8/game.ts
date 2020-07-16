import { Game, KeyControls, MouseControls } from '~gamelib';
import { GameScreen } from './GameScreen';

const game = new Game(800, 400);

const controls = {
  keys: new KeyControls(),
  mouse: new MouseControls(game.renderer.view),
};

function playHole() {
  game.scene = new GameScreen(game, controls, playHole);
}

playHole();
game.run();
