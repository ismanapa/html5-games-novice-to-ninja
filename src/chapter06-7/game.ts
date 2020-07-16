import {
  Engine, Bodies, World, Render,
} from 'matter-js';

const w = 800;
const h = 400;

const engine = Engine.create();

// Create some bodies
const course = Bodies.rectangle(400, 300, 350, 50, { isStatic: true });

const balls: Matter.Body[] = [...Array(50)].map(() => {
  const radius = Math.random() * 25 + 5;
  const x = Math.random() * w;
  const y = Math.random() * -1000;
  const options = {
    restitution: 0.7
  };
  return Bodies.circle(x, y, radius, options);
};

// Add them to the world
World.add(engine.world, [course, ...balls]);
Engine.run(engine);

// Debug render it
const render = Render.create({
  element: document.querySelector('#board'),
  engine,
  options: {
    width: w,
    height: h,
    // showAngleIndicator: true,
  },
});

Render.run(render);