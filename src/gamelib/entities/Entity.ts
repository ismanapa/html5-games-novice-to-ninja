import { Coordinates } from '~gamelib/types';
import { UpdateBehaviour } from '~gamelib/behaviours/UpdateBehaviour';
import { EntityType } from './EntityTypeEnum';

export abstract class Entity {
  pos: Coordinates;
  label: string;
  updateBehaviour: UpdateBehaviour;
  visible: boolean;
  type: EntityType;
  dead: boolean;
  w: number;
  h: number;

  constructor() {
    this.pos = { x: 0, y: 0 };
    this.visible = true;
  }

  update(dt: number, t: number) {
    if (this.updateBehaviour) {
      this.updateBehaviour.update(dt, t, this);
    }
  }

  setPos(pos: Coordinates) {
    this.pos = pos;
  }

  setIsDead(isDead: boolean) {
    this.dead = isDead;
  }
}
