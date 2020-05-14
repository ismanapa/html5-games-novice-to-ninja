import { Entity } from '~gamelib/entities/Entity';

export abstract class EntityCanvasRenderer {
  entityName: string;
  abstract render(ctx: CanvasRenderingContext2D, entity: Entity): void;
}
