import { Container } from './entities/Container';
import { CanvasRenderer } from './renderer/CanvasRenderer';

type GameUpdateFunc = (dt: number, t: number) => void;
const STEP = 1 / 60;
const MAX_FRAME = STEP * 5;

export class Game {
  w: number;
  h: number;
  parent: string;
  renderer: CanvasRenderer;
  scene: Container;

  constructor(w: number, h: number, parent: string = '#board') {
    this.w = w;
    this.h = h;
    this.renderer = new CanvasRenderer(w, h);
    document.querySelector(parent).appendChild(this.renderer.view);

    this.scene = new Container();
  }

  run(gameUpdate: GameUpdateFunc = (): void => { }) {
    let dt = 0;
    let last = 0;
    const loopy = (ms: number): void => {
      requestAnimationFrame(loopy);

      const t = ms / 1000; // Let's work in seconds
      dt = Math.min(t - last, MAX_FRAME);
      last = t;

      this.scene.update(dt, t);
      gameUpdate(dt, t);
      this.renderer.render(this.scene);
    };
    requestAnimationFrame(loopy);
  }
}
