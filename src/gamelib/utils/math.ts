export const randf = (min: number, max: number = null) => {
  if (max == null) {
    max = min || 1;
    min = 0;
  }
  return Math.random() * (max - min) + min;
};

export const rand = (min: number, max: number = null) => Math.floor(randf(min, max));

export const randOneIn = (max: number = 2) => rand(0, max) === 0;

export const randOneFrom = <T>(items: T[]): T => items[rand(items.length)];
