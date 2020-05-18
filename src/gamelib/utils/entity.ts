import { Entity } from '~gamelib/entities/Entity';
import { math } from './math';

const center = (entity: Entity) => {
  const { pos, w, h } = entity;
  return {
    x: pos.x + w / 2,
    y: pos.y + h / 2,
  };
};

const distance = (a: Entity, b: Entity) => math.distance(center(a), center(b));

export const entity = {
  center,
  distance,
};
