import {
  Game,
  KeyControls,
} from '~gamelib';
import { Level } from './Level';

const game = new Game(640, 480);
const { scene, w, h } = game;

const controls = new KeyControls();

const level = new Level(w, h);

scene.add(level);

game.run();
