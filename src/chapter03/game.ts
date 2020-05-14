import {
  Container, Text, CanvasRenderer, Texture, KeyControls, Sprite,
} from '~gamelib';

import background from './res/images/bg.png';
import bulletImg from './res/images/bullet.png';
import { Spaceship } from './Spaceship';
import { ShipUpdateBehaviour } from './SpaceshipBehaviour';
import { Bullets } from './Bullets';
import { Baddies } from './Baddies';

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

// Bad guays
const baddies = new Baddies();

// Bullet number
const bulletNumber = new Text('0');
bulletNumber.pos.x = 50;
bulletNumber.pos.y = 5;

// Add the score game object
const score = new Text('score:', {
  font: '20px sans-serif',
  fill: '#8B8994',
  align: 'center',
});
score.pos = { x: w / 2, y: h - 30 };

scene.add(new Sprite(textures.background));
scene.add(ship);
scene.add(bullets);
scene.add(bulletNumber);
scene.add(baddies);
scene.add(score);

// Game state variables
let lastShot = 0;
let lastSpawn = 0;
let spawnSpeed = 1.0; // in seconds
let scoreAmount = 0;
let gameOver = false;

function doGameOver() {
  const gameOverMessage = new Text('Game Over', {
    font: '30pt sans-serif',
    fill: '#8B8994',
    align: 'center',
  });
  gameOverMessage.pos = { x: w / 2, y: 120 };
  scene.add(gameOverMessage);
  scene.remove(ship);
  gameOver = true;
}

let dt = 0;
let last = 0;
function loopy(ms: number) {
  requestAnimationFrame(loopy);

  const t = ms / 1000;
  dt = t - last;
  last = t;

  // Game logic code
  if (!gameOver && controls.action && t - lastShot > 0.15) {
    lastShot = t;
    bullets.addBullet({ x: ship.pos.x + 24, y: ship.pos.y + 10 });
  }
  score.text = `score: ${scoreAmount}`; // update score

  // Spawn bad guys
  if (t - lastSpawn > spawnSpeed) {
    lastSpawn = t;
    const speed = -50 - (Math.random() * Math.random() * 100);
    const position = Math.random() * (h - 24);
    baddies.spawnBaddie({ x: w, y: position }, speed);

    // Accelerating for the next spawn
    spawnSpeed = spawnSpeed < 0.05 ? 0.6 : spawnSpeed * 0.97 + 0.001;
  }

  // Check for collisions, or out of screen
  baddies.children.forEach(baddie => {
    bullets.children.forEach(bullet => {
      // Check distance between baddie and bullet
      const dx = baddie.pos.x + 16 - (bullet.pos.x + 8);
      const dy = baddie.pos.y + 16 - (bullet.pos.y + 8);
      if (Math.sqrt(dx * dx + dy * dy) < 24) {
        // A hit!
        bullet.setIsDead(true);
        baddie.setIsDead(true);
        scoreAmount += Math.floor(t);
      }
    });

    // Check if baddie reached the city
    if (baddie.pos.x < -32) {
      if (!gameOver) {
        doGameOver();
      }
      baddie.setIsDead(true);
    }
  });

  bulletNumber.text = bullets.children.length.toString();

  scene.update(dt, t);
  renderer.render(scene);
}
requestAnimationFrame(loopy);
