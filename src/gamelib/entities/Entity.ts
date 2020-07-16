import { Coordinates, HitBox } from '~gamelib/types';
import { UpdateBehaviour } from '~gamelib/behaviours/UpdateBehaviour';
import { EntityType } from './EntityTypeEnum';
import { Vec } from '../utils/Vec';

export abstract class Entity {
  pos: Vec;
  label: string;
  updateBehaviour: UpdateBehaviour;
  visible: boolean;
  type: EntityType;
  dead: boolean;
  w: number;
  h: number;
  hitBox: HitBox;
  rotation: number;
  pivot: Coordinates | Vec;
  anchor: Coordinates;
  scale: Coordinates;
  acc: Vec;
  mass: number;
  vel: Vec;

  constructor() {
    this.pos = new Vec();
    this.visible = true;
  }

  update(dt: number, t: number) {
    if (this.updateBehaviour) {
      this.updateBehaviour.update(dt, t, this);
    }
  }

  setPos(pos: Vec) {
    this.pos = pos;
  }

  setIsDead(isDead: boolean) {
    this.dead = isDead;
  }
}
