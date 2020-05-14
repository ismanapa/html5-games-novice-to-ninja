import { Entity } from '~gamelib/entities/Entity';
import { Texture } from '~gamelib/entities/Texture';
import { EntityType } from './EntityTypeEnum';

export class Sprite extends Entity {
  texture: Texture;

  constructor(texture: Texture) {
    super();
    this.texture = texture;
    this.type = EntityType.Sprite;
  }
}
