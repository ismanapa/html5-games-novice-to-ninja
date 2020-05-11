import { UpdateBehaviour } from '~gamelib/behaviours/UpdateBehaviour';
import { Container } from '~gamelib/entities/Container';

export class ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Container): void {
    console.log(entity);
    entity.children.forEach(child => {
      if (child.updateBehaviour) {
        child.update(dt, t);
      }
    });
  }
}
