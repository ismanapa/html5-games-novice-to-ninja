import {
  Container, Text, CanvasRenderer, Texture, KeyControls, Sprite, UpdateBehaviour,
} from '~gamelib';

import background from './res/images/bg.png';
import spaceship from './res/images/spaceship.png';
import bulletImg from './res/images/bullet.png';


class ShipUpdateBehaviour implements UpdateBehaviour {
  controls: KeyControls;
  canvasSize: { w: number, h: number };

  constructor(shipControls: KeyControls, canvasSize: { w: number, h: number }) {
    this.controls = shipControls;
    this.canvasSize = canvasSize;
  }

  update(udt: number, t: number, entity: Sprite): void {
    const { pos } = entity;
    pos.x += this.controls.x * udt * 200;
    pos.y += this.controls.y * udt * 200;

    if (pos.x < 0) pos.x = 0;
    if (pos.x > this.canvasSize.w) pos.x = this.canvasSize.w;
    if (pos.y < 0) pos.y = 0;
    if (pos.y > this.canvasSize.h) pos.y = this.canvasSize.h;
  }
}

// Game setup code
const w = 640;
const h = 300;
const renderer = new CanvasRenderer(w, h);
document.querySelector('#board').appendChild(renderer.view);

const textures = {
  background: new Texture(background),
  spaceship: new Texture(spaceship),
  bullet: new Texture(bulletImg),
};

const scene = new Container();
const controls = new KeyControls();

// Make a spaceship
const ship = new Sprite(textures.spaceship);
ship.pos.x = 120;
ship.pos.y = h / 2 - 16;
ship.updateBehaviour = new ShipUpdateBehaviour(controls, { w, h });


// Bullets
const bullets = new Container();

function fireBullet(x: number, y: number) {
  const bullet = new Sprite(textures.bullet);
  bullet.pos.x = x;
  bullet.pos.y = y;
  bullet.update = function (dt) {
    this.pos.x += 400 * dt;
  };
  bullets.add(bullet);
}

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
    fireBullet(ship.pos.x + 24, ship.pos.y + 10);
  }

  bullets.children = bullets.children.filter(bullet => bullet.pos.x < w + 20);
  bulletNumber.text = bullets.children.length.toString();

  scene.update(dt, t);
  renderer.render(scene);
}
requestAnimationFrame(loopy);
