import { Sprite } from '~gamelib/entities/Sprite';
import { EntityCanvasRenderer } from './EntityCanvasRenderer';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';

export class SpriteCanvasRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = EntityType.Sprite;
  }

  render(ctx: CanvasRenderingContext2D, entity: Sprite) {
    if (entity.anchor) ctx.translate(entity.anchor.x, entity.anchor.y);
    if (entity.scale) ctx.scale(entity.scale.x, entity.scale.y);
    if (entity.rotation) {
      const px = entity.pivot ? entity.pivot.x : 0;
      const py = entity.pivot ? entity.pivot.y : 0;
      ctx.translate(px, py);
      ctx.rotate(entity.rotation);
      ctx.translate(-px, -py);
    }
    ctx.drawImage(entity.texture.img, 0, 0);
  }
}
