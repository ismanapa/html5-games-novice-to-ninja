import { EntityCanvasRenderer } from './EntityCanvasRenderer';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';
import { TileSprite } from '~gamelib/entities/TileSprite';

export class TileSpriteCanvasRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = EntityType.TileSprite;
  }

  render(ctx: CanvasRenderingContext2D, entity: TileSprite) {
    if (entity.anchor) ctx.translate(entity.anchor.x, entity.anchor.y);
    if (entity.scale) ctx.scale(entity.scale.x, entity.scale.y);
    if (entity.rotation) {
      const px = entity.pivot ? entity.pivot.x : 0;
      const py = entity.pivot ? entity.pivot.y : 0;
      ctx.translate(px, py);
      ctx.rotate(entity.rotation);
      ctx.translate(-px, -py);
    }
    const { img } = entity.texture;
    ctx.drawImage(
      img,
      entity.frame.x * entity.tileW, // source x
      entity.frame.y * entity.tileH, // source y
      entity.tileW, entity.tileH, // width & height
      0, 0, // destination x & y
      entity.tileW, entity.tileH, // destination width & height
    );
  }
}
