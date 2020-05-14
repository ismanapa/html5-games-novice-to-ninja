import { Sprite } from '~gamelib/entities/Sprite';
import { EntityCanvasRenderer } from './EntityCanvasRenderer';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';

export class SpriteCanvasRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = EntityType.Sprite;
  }

  render(ctx: CanvasRenderingContext2D, entity: Sprite) {
    ctx.drawImage(entity.texture.img, 0, 0);
  }
}
