import { Entity } from '../entities/Entity';
import { Vec } from './Vec';

const applyForce = (e: Entity, force: Vec) => {
  const { acc, mass = 1 } = e;
  acc.x += force.x / mass;
  acc.y += force.y / mass;
};

const applyImpulse = (e: Entity, force: Vec, dt: number) => {
  applyForce(e, { x: force.x / dt, y: force.y / dt } as Vec);
};

const integrate = (e: Entity, dt: number) => {
  const { pos, vel, acc } = e;
  const vx = vel.x + acc.x * dt;
  const vy = vel.y + acc.y * dt;
  const x = (vel.x + vx) / 2 * dt;
  const y = (vel.y + vy) / 2 * dt;
  pos.add({ x, y } as Vec);
  vel.set(vx, vy);
  acc.set(0, 0);
};

const speed = ({ vel }: Entity) => Math.sqrt(vel.x * vel.x + vel.y * vel.y);

export const physics = {
  applyForce,
  applyImpulse,
  integrate,
  speed,
};
