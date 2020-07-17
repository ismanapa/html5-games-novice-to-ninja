import { Container } from '~gamelib/entities/Container';
import {
  TextCanvasRenderer,
  SpriteCanvasRenderer,
  EntityCanvasRenderer,
  TileSpriteCanvasRenderer,
  RectCanvasRenderer,
  ContainerRenderer,
} from './EntityRenderes';

export class CanvasRenderer {
  w: number;
  h: number;
  view: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  renderes: EntityCanvasRenderer[];

  constructor(w: number, h: number) {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    this.w = w;
    this.h = h;
    this.view = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.textBaseline = 'top';

    this.renderes = [
      new TextCanvasRenderer(),
      new SpriteCanvasRenderer(),
      new TileSpriteCanvasRenderer(),
      new RectCanvasRenderer(),
      new ContainerRenderer(),
    ];
  }

  render(container: Container, clear = true) {
    if (container.visible === false) {
      return;
    }
    const { ctx, renderes } = this;

    function renderRec(cont: Container) {
      // Render the container children
      cont.children.forEach(child => {
        if (child.visible === false) {
          return;
        }
        ctx.save();

        // Handle transforms
        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }
        if (child.anchor) ctx.translate(child.anchor.x, child.anchor.y);
        if (child.scale) ctx.scale(child.scale.x, child.scale.y);
        if (child.rotation) {
          const px = child.pivot ? child.pivot.x : 0;
          const py = child.pivot ? child.pivot.y : 0;
          ctx.translate(px, py);
          ctx.rotate(child.rotation);
          ctx.translate(-px, -py);
        }

        const renderer = renderes.find(r => r.entityName === child.type);
        if (renderer) {
          renderer.render(ctx, child);
        }

        // Render any child sub-nodes
        if (child instanceof Container) {
          renderRec(child);
        }
        ctx.restore();
      });
    }

    if (clear) {
      ctx.clearRect(0, 0, this.w, this.h);
    }

    renderRec(container);
  }
}
