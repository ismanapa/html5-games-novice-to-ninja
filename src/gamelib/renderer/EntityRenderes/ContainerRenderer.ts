import { EntityCanvasRenderer } from './EntityCanvasRenderer';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';
import { Container } from '~gamelib/entities/Container';

export class ContainerRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = EntityType.Container;
  }

  render(ctx: CanvasRenderingContext2D, entity: Container): void {
    if (entity.path) {
      const [head, ...tail] = entity.path;
      if (entity.path.length > 1) {
        ctx.fillStyle = entity.style.fill || '#fff';
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        tail.forEach(({ x, y }) => ctx.lineTo(x, y));
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}
