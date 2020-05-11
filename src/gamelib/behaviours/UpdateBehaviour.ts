import { Entity } from '~gamelib/entities/Entity';

export interface UpdateBehaviour {
  update(dt: number, t: number, entity: Entity): void;
}
