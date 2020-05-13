import { Entity } from '~gamelib/entities/Entity';
import { ContainerUpdateBehaviour } from '~gamelib/behaviours/ContainerUpdateBehaviour';

export class Container extends Entity {
  children: Entity[];

  constructor() {
    super();
    this.children = [];
    this.updateBehaviour = new ContainerUpdateBehaviour();
  }

  add(child: Entity) {
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
}
