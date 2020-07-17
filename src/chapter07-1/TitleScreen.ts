import {
  Sound, Container, Text, MouseControls, KeyControls, Game, Assets
} from '~gamelib';

import theme from './res/sounds/theme.mp3';

type Controls = {
  mouse: MouseControls,
  keys: KeyControls
};

const sounds = {
  theme: new Sound(theme, { volume: 0.1, loop: true }),
};

export class TitleScreen extends Container {
  onStart: (completed: boolean, shots: number) => void;
  keys: KeyControls;
  isReady: boolean;

  constructor(
    game: Game,
    controls: Controls,
    onStart: (completed: boolean, shots: number) => void,
  ) {
    super();
    this.onStart = onStart;
    this.keys = controls.keys;
    this.isReady = false;

    const title = this.add(new Text('Pengolfin', {
      font: '60pt Freckle Face, cursive',
      align: 'center',
      fill: '#fff',
    }));
    title.pos.set(game.w / 2, game.h / 2 - 40);

    const subTitle = this.add(new Text('Loading...', {
      font: '15pt Freckle Face, cursive',
      align: 'center',
      fill: '#fff',
    }));
    subTitle.pos.set(game.w / 2, game.h / 2 + 50);

    Assets.onReady(() => {
      this.isReady = true;
      subTitle.text = 'Press space to start';
    });

    sounds.theme.play();
  }

  update() {
    const { keys } = this;

    if (this.isReady && keys.action) {
      sounds.theme.stop();
      this.onStart(true, 0);
    }
  }
}