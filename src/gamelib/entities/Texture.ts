import { Entity } from '~gamelib/entities/Entity';
import { Assets } from '~gamelib/Assets';

export class Texture extends Entity {
  img: HTMLImageElement;

  constructor(url: string) {
    super();
    this.img = Assets.image(url);
  }
}
