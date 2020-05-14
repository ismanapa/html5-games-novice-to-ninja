import { Coordinates } from '~gamelib/types';
import { UpdateBehaviour } from '~gamelib/behaviours/UpdateBehaviour';

export abstract class Entity {
  pos: Coordinates;
  label: string;
  updateBehaviour: UpdateBehaviour;
  visible: boolean;
  type: string;
  dead: boolean;

  constructor() {
    this.pos = { x: 0, y: 0 };
    this.visible = true;
  }

  update(dt: number, t: number) {
    this.updateBehaviour?.update(dt, t, this);
  }

  setPos(pos: Coordinates) {
    this.pos = pos;
  }

  setIsDead(isDead: boolean) {
    this.dead = isDead;
  }
}
