import { UpdateBehaviour } from '~gamelib';

import { Bat } from './Bat';

export class BatBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Bat): void {
    const { pos, speed, waypoint } = entity;

    // Move in the direction of the path
    const xo = waypoint.x - pos.x + 4;
    const yo = waypoint.y - pos.y - 1;

    const step = speed * dt;
    const xIsClose = Math.abs(xo) <= step;
    const yIsClose = Math.abs(yo) <= step;

    if (!xIsClose) {
      pos.x += speed * (xo > 0 ? 1 : -1) * dt;
    }
    if (!yIsClose) {
      pos.y += speed * (yo > 0 ? 1 : -1) * dt;
    }

    if (xIsClose && yIsClose) {
      // New way point
      entity.waypoint = entity.findWaypoint();
    }

    entity.frame.x = ((t / 0.1) | 0) % 2 + 3;
  }
}
