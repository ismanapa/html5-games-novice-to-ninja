import {
  Container, Sprite, UpdateBehaviour, ContainerUpdateBehaviour, Texture, Text, Coordinates,
} from '~gamelib';

import logoImg from '../res/images/irrational-potato.png';

export class LogoScreen extends Container {
  onStart: () => void;
  life: number;
  logo: Sprite;
  text: Text;

  constructor(onStart: () => void) {
    super();

    const drawText = (msg: string, pos: Coordinates, size = 24) => {
      const font = `${size}pt 'VT323', monospace`;
      const text = new Text(msg, { font, fill: '#111' });
      text.pos = pos;
      return this.add(text);
    };

    this.onStart = onStart;
    this.life = 2;

    this.logo = this.add(new Sprite(new Texture(logoImg)));
    this.logo.setPos({ x: 220, y: 100 });
    this.text = drawText('Irrational Potato', { x: 180, y: 300 });

    this.updateBehaviour = new LogoScreenBehaviour();
  }
}


class LogoScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: LogoScreen) {
    super.update(dt, t, entity);
    entity.life -= dt;

    const { logo, life, text } = entity;
    if (life < 0) {
      entity.onStart();
    }
    if (life < 0.4) {
      logo.pos.y -= 1000 * dt;
      text.pos.y -= 1000 * dt;
    }
  }
}
