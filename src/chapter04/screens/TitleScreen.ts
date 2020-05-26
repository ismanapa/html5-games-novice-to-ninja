import {
  Container, Game, KeyControls, Coordinates, Text, ContainerUpdateBehaviour, UpdateBehaviour,
} from '~gamelib';

import { Level } from '../Level';
import { Squizz } from '../entities/Squizz';

export class TitleScreen extends Container {
  onStart: () => void;
  controls: KeyControls;
  title: Text;

  constructor(game: Game, controls: KeyControls, onStart: () => void) {
    super();
    this.onStart = onStart;
    this.controls = controls;
    controls.reset();

    const drawText = (msg: string, pos: Coordinates, size = 24) => {
      const font = `${size}pt 'VT323', monospace`;
      const text = new Text(msg, { font, fill: '#111' });
      text.pos = pos;
      return this.add(text);
    };

    this.add(new Level(game.w, game.h));

    this.title = drawText('SQUIZZBALL', { x: 230, y: 100 }, 40);

    drawText('Fill up the screen!', { x: 220, y: 200 });
    drawText('Avoid the wildebeest.', { x: 220, y: 300 });
    drawText('Press space to start.', { x: 220, y: 350 }, 12);

    const fakeControls = new KeyControls(false);
    const squizz = this.add(new Squizz(fakeControls));
    squizz.update = () => { };
    squizz.pos = { x: 140, y: 200 };

    this.updateBehaviour = new TitleScreenBehaviour();
  }
}

class TitleScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: TitleScreen) {
    super.update(dt, t, entity);

    const { title, controls } = entity;
    title.pos.y += Math.sin(t / 0.3) * 0.3;
    title.pos.x += Math.cos(t / 0.25) * 0.3;
    if (controls.action) {
      entity.onStart();
    }
  }
}
