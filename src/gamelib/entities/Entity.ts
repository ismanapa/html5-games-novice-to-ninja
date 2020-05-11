import { Coordinates } from '~gamelib/types';
import { UpdateBehaviour } from '~gamelib/behaviours/UpdateBehaviour';

export abstract class Entity {
  pos: Coordinates;
  label: string;
  updateBehaviour: UpdateBehaviour;

  constructor() {
    this.pos = { x: 0, y: 0 };
  }

  update(dt: number, t: number) {
    this.updateBehaviour.update(dt, t, this);
  }
}
