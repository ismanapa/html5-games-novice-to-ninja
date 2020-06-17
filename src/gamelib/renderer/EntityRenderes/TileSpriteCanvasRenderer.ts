import { EntityCanvasRenderer } from './EntityCanvasRenderer';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';
import { TileSprite } from '~gamelib/entities/TileSprite';

export class TileSpriteCanvasRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = EntityType.TileSprite;
  }

  render(ctx: CanvasRenderingContext2D, entity: TileSprite) {
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
