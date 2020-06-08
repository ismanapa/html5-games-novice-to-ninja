import { EntityCanvasRenderer } from './EntityCanvasRenderer';
import { Rect } from '~gamelib/entities/Rect';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';

export class RectCanvasRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = EntityType.Rect;
  }

  render(ctx: CanvasRenderingContext2D, entity: Rect): void {
    ctx.fillStyle = entity.style.fill;
    ctx.fillRect(0, 0, entity.w, entity.h);
  }
}
