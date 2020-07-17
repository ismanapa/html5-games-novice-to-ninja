import { Entity } from '~gamelib/entities/Entity';
import { ContainerUpdateBehaviour } from '~gamelib/behaviours/ContainerUpdateBehaviour';
import { EntityType } from './EntityTypeEnum';
import { Coordinates } from '~gamelib/types';

export class Container extends Entity {
  children: Entity[];
  path: Coordinates[];
  style: { [key: string]: any };

  constructor() {
    super();
    this.children = [];
    this.type = EntityType.Container;
    this.updateBehaviour = new ContainerUpdateBehaviour();
  }

  add<T extends Entity>(child: T): T {
    this.children.push(child);
    return child;
  }

  remove(child: Entity) {
    this.children = this.children.filter(c => c !== child);
    return child;
  }

  setChildren(children: Entity[]) {
    this.children = children;
  }

  map(f: (entity: Entity) => void) {
    return this.children.map(f);
  }
}
