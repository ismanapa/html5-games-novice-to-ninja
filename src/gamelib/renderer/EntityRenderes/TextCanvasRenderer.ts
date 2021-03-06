import { Text } from '~gamelib/entities/Text';
import { EntityCanvasRenderer } from './EntityCanvasRenderer';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';

export class TextCanvasRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = EntityType.Text;
  }

  render(ctx: CanvasRenderingContext2D, entity: Text) {
    const { font, fill, align } = entity.style;
    if (font) ctx.font = font;
    if (fill) ctx.fillStyle = fill;
    if (align) ctx.textAlign = align;
    ctx.fillText(entity.text, 0, 0);
  }
}
