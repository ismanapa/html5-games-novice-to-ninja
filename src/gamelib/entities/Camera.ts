import { Container } from './Container';
import { Dimensions, Coordinates } from '../types';
import { Entity } from './Entity';
import { Sprite } from './Sprite';
import { math } from '../utils/math';
import { CameraBehaviour } from '../behaviours/CameraBehaviour';
import { Vec } from '../utils/Vec';

export class Camera extends Container {
  worldSize: Dimensions;
  subject: Coordinates | Vec;
  offset: Coordinates;

  constructor(
    subject: Entity | Coordinates, viewport: Dimensions, worldSize: Dimensions = viewport,
  ) {
    super();
    this.w = viewport.w;
    this.h = viewport.h;
    this.worldSize = worldSize;
    this.updateBehaviour = new CameraBehaviour();

    this.setSubject(subject);
  }

  setSubject(e: Entity | Coordinates) {
    if (e) {
      this.subject = e instanceof Entity ? e.pos : e;
    } else {
      this.subject = this.pos;
    }

    this.offset = { x: 0, y: 0 };

    // Center on the entity
    if (e instanceof Entity) {
      this.offset.x += e.w / 2;
      this.offset.y += e.h / 2;
    }

    if (e instanceof Sprite) {
      this.offset.x -= e.anchor.x;
      this.offset.y -= e.anchor.y;
    }

    this.focus();
  }

  focus() {
    const {
      pos, w, h, worldSize, subject, offset,
    } = this;

    const centeredX = subject.x + offset.x - w / 2;
    const maxX = worldSize.w - w;
    const x = -math.clamp(centeredX, 0, maxX);

    const centeredY = subject.y + offset.y - h / 2;
    const maxY = worldSize.h - h;
    const y = -math.clamp(centeredY, 0, maxY);

    pos.x = x;
    pos.y = y;
  }
}
