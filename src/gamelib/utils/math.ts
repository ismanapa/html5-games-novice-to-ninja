import { Coordinates } from '~gamelib/types';

const randf = (min: number, max: number = null) => {
  if (max == null) {
    max = min || 1;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

const rand = (min: number, max: number = null) => Math.floor(randf(min, max));

const randOneIn = (max: number = 2) => rand(0, max) === 0;

const randOneFrom = <T>(items: T[]): T => items[rand(items.length)];

const distance = (a: Coordinates, b: Coordinates): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const clamp = (x: number, min: number, max: number) => Math.max(min, Math.min(x, max));

const angle = (a: Coordinates, b: Coordinates) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const angle = Math.atan2(dy, dx);

  return angle;
};

export const math = {
  randf,
  rand,
  randOneFrom,
  randOneIn,
  distance,
  clamp,
  angle,
};
