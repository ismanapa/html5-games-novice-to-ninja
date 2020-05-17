import { Entity } from '~gamelib/entities/Entity';
import { Texture } from '~gamelib/entities/Texture';
import { EntityType } from './EntityTypeEnum';

export class Sprite extends Entity {
  texture: Texture;
  scale: { x: number; y: number };
  anchor: { x: number; y: number };
  pivot: { x: number; y: number };
  rotation: number;

  constructor(texture: Texture) {
    super();
    this.texture = texture;
    this.type = EntityType.Sprite;
    this.scale = { x: 1, y: 1 };
    this.anchor = { x: 0, y: 0 };
    this.pivot = { x: 0, y: 0 };
    this.rotation = 0;
  }
}
