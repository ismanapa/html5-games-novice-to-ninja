import { Entity } from '../entities/Entity';
import { Vec } from './Vec';

const applyForce = (e: Entity, force: Vec) => {
  const { acc, mass = 1 } = e;
  acc.x += force.x / mass;
  acc.y += force.y / mass;
};

const applyFriction = (e: Entity, amount: number) => {
  const friction = e.vel.clone().multiply(-1).normalize().multiply(amount);
  applyForce(e, friction);
};

const applyHorizontalFriction = (e: Entity, amount: number) => {
  const friction = e.vel
    .clone()
    .multiply(-1)
    .normalize()
    .multiply(amount);
  applyForce(e, { x: friction.x, y: 0 } as Vec);
};

const applyImpulse = (e: Entity, force: Vec, dt: number) => {
  applyForce(e, { x: force.x / dt, y: force.y / dt } as Vec);
};

const integrate = (e: Entity, dt: number) => {
  const { vel, acc } = e;
  const vx = vel.x + acc.x * dt;
  const vy = vel.y + acc.y * dt;
  const x = (vel.x + vx) / 2 * dt;
  const y = (vel.y + vy) / 2 * dt;
  vel.set(vx, vy);
  acc.set(0, 0);
  return { x, y } as Vec;
};

const integratePos = (e: Entity, dt: number) => {
  const dis = integrate(e, dt);
  e.pos.add(dis);
  return dis;
};

const speed = ({ vel }: Entity) => Math.sqrt(vel.x * vel.x + vel.y * vel.y);

export const physics = {
  applyForce,
  applyImpulse,
  integrate,
  integratePos,
  speed,
  applyFriction,
  applyHorizontalFriction,
};
