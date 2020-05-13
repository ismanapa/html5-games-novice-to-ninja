import { Sprite } from '~gamelib/entities/Sprite';
import { EntityCanvasRenderer } from './EntityCanvasRenderer';

export class SpriteCanvasRenderer extends EntityCanvasRenderer {
  constructor() {
    super();
    this.entityName = Sprite.name;
  }

  render(ctx: CanvasRenderingContext2D, entity: Sprite) {
    ctx.drawImage(entity.texture.img, 0, 0);
  }
}
