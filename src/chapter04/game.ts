import {
  Game,
  KeyControls,
  math,
  entity,
  Camera,
  Container,
} from '~gamelib';
import { Level } from './Level';
import { Squizz } from './entities/Squizz';
import { Baddie } from './entities/Baddie';
import { Baddies } from '~chapter03/Baddies';

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

const addBaddies = (lev: Level) => {
  const baddies = new Container();
  // Horizontal bad guys
  for (let i = 0; i < 5; i++) {
    const b = baddies.add(new Baddie(32 * 5, 0));
    b.pos.y = Math.floor(lev.h / 5) * i + lev.tileH * 2;
  }
  // Vertical bad guys
  for (let i = 0; i < 10; i++) {
    const b = baddies.add(new Baddie(0, 32 * 5));
    b.pos.x = Math.floor(lev.w / 10) * i + lev.tileW;
  }
  return baddies;
};

const baddies = addBaddies(level);
camera.add(baddies);

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
  if (ground === 'cleared') {
    squizz.dead = true;
  }

  baddies.children.forEach((b: Baddie) => {
    const { pos } = b;
    if (entity.distance(squizz, b) < 32) {
      // A hit!
      squizz.dead = true;

      // Send off screen for a bit
      if (b.xSpeed) pos.x = -level.w;
      else pos.y = -level.h;
    }

    // Screen wrap
    if (pos.x > level.w) pos.x = -32;
    if (pos.y > level.h) pos.y = -32;
  });
});
