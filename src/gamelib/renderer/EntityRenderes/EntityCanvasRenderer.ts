import { Entity } from '~gamelib/entities/Entity';
import { EntityType } from '~gamelib/entities/EntityTypeEnum';

export abstract class EntityCanvasRenderer {
  entityName: EntityType;
  abstract render(ctx: CanvasRenderingContext2D, entity: Entity): void;
}
