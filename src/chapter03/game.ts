import {
  Container, Text, CanvasRenderer, Texture, KeyControls, Sprite,
} from '~gamelib';

import background from './res/images/bg.png';
import bulletImg from './res/images/bullet.png';
import { Spaceship } from './spaceship';
import { ShipUpdateBehaviour } from './SpaceshipBehaviour';
import { Bullets } from './Bullets';

// Game setup code
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w, h);
document.querySelector('#board').appendChild(renderer.view);

const textures = {
  background: new Texture(background),
  bullet: new Texture(bulletImg),
};

const scene = new Container();
const controls = new KeyControls();

// Make a spaceship
const ship = new Spaceship(
  { x: 120, y: h / 2 - 16 },
  new ShipUpdateBehaviour(controls, { w, h }),
);

// Bullets
const bullets = new Bullets(w);

const bulletNumber = new Text('0');
bulletNumber.pos.x = 50;
bulletNumber.pos.y = 5;

scene.add(new Sprite(textures.background));
scene.add(ship);
scene.add(bullets);
scene.add(bulletNumber);

let lastShot = 0;

let dt = 0;
let last = 0;
function loopy(ms: number) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  // Game logic code
  // ship.pos.x += Math.sin(t * 10);
  if (controls.action && t - lastShot > 0.15) {
    lastShot = t;
    bullets.addBullet({ x: ship.pos.x + 24, y: ship.pos.y + 10 });
  }

  bulletNumber.text = bullets.children.length.toString();

  scene.update(dt, t);
  renderer.render(scene);
}
requestAnimationFrame(loopy);
