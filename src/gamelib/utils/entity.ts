import { Entity } from '../entities/Entity';
import { Container } from '../entities/Container';
import { Rect } from '../entities/Rect';
import { math } from './math';
import { HitBox } from '../types';

const center = (entity: Entity) => {
  const { pos, w, h } = entity;
  return {
    x: pos.x + w / 2,
    y: pos.y + h / 2,
  };
};

const distance = (a: Entity, b: Entity) => math.distance(center(a), center(b));

const addDebug = (e: Container) => {
  e.children = e.children || [];
  const bb = new Rect(e.w, e.h, { fill: 'rgba(255, 0, 0, 0.3)' });
  e.children.push(bb);
  if (e.hitBox) {
    const {
      x, y, w, h,
    } = e.hitBox;
    const hb = new Rect(w, h, { fill: 'rgba(255, 0, 0, 0.5)' });
    hb.pos.x = x;
    hb.pos.y = y;
    e.children.push(hb);
  }
  return e;
};


const bounds = (entity: Entity): HitBox => {
  const {
    w, h, pos, hitBox,
  } = entity;
  const hit = hitBox || {
    x: 0, y: 0, w, h,
  };
  return {
    x: hit.x + pos.x,
    y: hit.y + pos.y,
    w: hit.w - 1,
    h: hit.h - 1,
  };
};

const hit = (e1: Entity, e2: Entity) => {
  const a = bounds(e1);
  const b = bounds(e2);
  return a.x + a.w >= b.x
    && a.x <= b.x + b.w
    && a.y + a.h >= b.y
    && a.y <= b.y + b.h;
};

const hits = (entity: Entity, container: Container, hitCallback: (e: Entity) => void) => {
  const a = bounds(entity);
  container.map(e2 => {
    const b = bounds(e2);
    if (
      a.x + a.w >= b.x
      && a.x <= b.x + b.w
      && a.y + a.h >= b.y
      && a.y <= b.y + b.h
    ) {
      hitCallback(e2);
    }
  });
};

export const entity = {
  center,
  distance,
  bounds,
  hit,
  hits,
  addDebug,
};
