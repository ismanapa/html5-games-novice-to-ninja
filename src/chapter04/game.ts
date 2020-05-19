import {
  Game,
  KeyControls,
  math,
  entity,
  Camera,
} from '~gamelib';
import { Level } from './Level';
import { Squizz } from './entities/Squizz';

const game = new Game(640, 480);
const { scene, w, h } = game;

const controls = new KeyControls();
const squizz = new Squizz(controls);
const level = new Level(w * 2, h * 2);
squizz.pos = { x: level.w / 2, y: level.h / 2 };
const camera = new Camera(squizz, { w, h }, { w: level.w, h: level.h });

scene.add(camera);

camera.add(level);
camera.add(squizz);

game.run(() => {
  const { pos } = squizz;
  const {
    bounds: {
      top, bottom, left, right,
    },
  } = level;

  // Confine the player pos to bounds area
  pos.x = math.clamp(pos.x, left, right);
  pos.y = math.clamp(pos.y, top, bottom);

  const ground = level.checkGround(entity.center(squizz));
  console.log(ground);
});
