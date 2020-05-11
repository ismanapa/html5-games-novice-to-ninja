import { Entity } from '~gamelib/entities/Entity';
import { Texture } from '~gamelib/entities/Texture';

export class Sprite extends Entity {
  texture: Texture;

  constructor(texture: Texture) {
    super();
    this.texture = texture;
  }
}
