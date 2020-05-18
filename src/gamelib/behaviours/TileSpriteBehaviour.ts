import { UpdateBehaviour } from './UpdateBehaviour';
import { TileSprite } from '~gamelib/entities/TileSprite';

export class TileSpriteBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: TileSprite): void {
    entity.anims.update(dt, t);
  }
}
