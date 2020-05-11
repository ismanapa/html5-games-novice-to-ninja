import { Entity } from '~gamelib/entities/Entity';

export class Texture extends Entity {
  img: HTMLImageElement;

  constructor(url: string) {
    super();
    this.img = new Image();
    this.img.src = url;
  }
}
