import { Entity } from '~gamelib/entities/Entity';

export class Text extends Entity {
  text: string;
  style: { [key: string]: any };

  constructor(text = '', style = {}) {
    super();
    this.type = Text.name;
    this.text = text;
    this.style = style;
  }
}
