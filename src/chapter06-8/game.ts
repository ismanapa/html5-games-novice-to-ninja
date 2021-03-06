import { Game, KeyControls, MouseControls, math } from '~gamelib';
import { GameScreen } from './GameScreen';

const game = new Game(800, 400);
const controls = {
  keys: new KeyControls(),
  mouse: new MouseControls(game.renderer.view),
};

math.useSeededRandom(true);
let lastSeed = 1; // (Math.random() * 420000) | 0;
math.randomSeed(lastSeed);

let hole = 0;
let total = 0;


function playHole(completed: boolean, shots: number) {
  if (completed) {
    hole++;
    total += shots;
    shots = 0;
  } else {
    // Reset seed to last level
    math.randomSeed(lastSeed);
  }

  lastSeed = math.randomSeed();
  const stats = {
    hole,
    shots,
    total,
  };
  game.scene = new GameScreen(game, controls, playHole, stats);
}

playHole(true, 0);
game.run();
