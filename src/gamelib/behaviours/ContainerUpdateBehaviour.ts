import { UpdateBehaviour } from '~gamelib/behaviours/UpdateBehaviour';
import { Container } from '~gamelib/entities/Container';

export class ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Container): void {
    const children = entity.children.filter(child => {
      if (child.updateBehaviour || child.update) {
        child.update(dt, t);
      }
      return !child.dead;
    });

    entity.setChildren(children);
  }
}
