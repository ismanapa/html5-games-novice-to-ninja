import { UpdateBehaviour, KeyControls } from '~gamelib';
import { Spaceship } from './spaceship';

export class ShipUpdateBehaviour implements UpdateBehaviour {
  controls: KeyControls;
  canvasSize: { w: number, h: number };

  constructor(shipControls: KeyControls, canvasSize: { w: number, h: number }) {
    this.controls = shipControls;
    this.canvasSize = canvasSize;
  }

  update(udt: number, t: number, entity: Spaceship): void {
    const { pos } = entity;
    pos.x += this.controls.x * udt * 200;
    pos.y += this.controls.y * udt * 200;

    if (pos.x < 0) pos.x = 0;
    if (pos.x > this.canvasSize.w) pos.x = this.canvasSize.w;
    if (pos.y < 0) pos.y = 0;
    if (pos.y > this.canvasSize.h) pos.y = this.canvasSize.h;
  }
}
