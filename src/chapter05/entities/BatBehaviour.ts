import { UpdateBehaviour, entity, math } from '~gamelib';

import { Bat, BatStates } from './Bat';

export class BatBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, bat: Bat): void {
    const {
      pos, frame, speed, target, waypoint, state,
    } = bat;

    const angle = entity.angle(target, bat);
    const distance = entity.distance(target, bat);
    let xo = 0;
    let yo = 0;
    let waypointAngle;
    let waypointDistance;

    switch (state.get()) {
      case BatStates.ATTACK:
        xo = Math.cos(angle) * speed * dt;
        yo = Math.sin(angle) * speed * dt;
        if (distance < 60) {
          state.set(BatStates.EVADE);
        }
        break;
      case BatStates.EVADE:
        xo = -Math.cos(angle) * speed * dt;
        yo = -Math.sin(angle) * speed * dt;
        if (distance > 120) {
          if (math.randOneIn(2)) {
            state.set(BatStates.WANDER);
            bat.waypoint = {
              x: pos.x + math.rand(-200, 200),
              y: pos.y + math.rand(-200, 200),
            };
          } else {
            state.set(BatStates.ATTACK);
          }
        }
        break;
      case BatStates.WANDER:
        waypointAngle = math.angle(waypoint, pos);
        waypointDistance = math.distance(pos, waypoint);

        xo = Math.cos(waypointAngle) * speed * dt;
        yo = Math.sin(waypointAngle) * speed * dt;
        if (waypointDistance < 60) {
          state.set(BatStates.EVADE);
        }
        break;
    }
    pos.x += xo;
    pos.y += yo;

    frame.x = ((t / 0.1) | 0) % 2 + 3;
    state.update(dt);
  }
}
