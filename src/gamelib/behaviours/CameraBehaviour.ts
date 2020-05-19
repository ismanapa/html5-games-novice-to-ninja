import { ContainerUpdateBehaviour } from './ContainerUpdateBehaviour';
import { UpdateBehaviour } from './UpdateBehaviour';
import { Camera } from '../entities/Camera';

export class CameraBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Camera): void {
    super.update(dt, t, entity);

    if (entity.subject) {
      entity.focus();
    }
  }
}
