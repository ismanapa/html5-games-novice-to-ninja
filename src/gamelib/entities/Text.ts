import { Entity } from '~gamelib/entities/Entity';
import { EntityType } from './EntityTypeEnum';

export class Text extends Entity {
  text: string;
  style: { [key: string]: any };

  constructor(text = '', style = {}) {
    super();
    this.type = EntityType.Text;
    this.text = text;
    this.style = style;
  }
}
