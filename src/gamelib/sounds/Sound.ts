import { SoundOptions } from './SoundTypes';
import { Assets } from '../Assets';

export class Sound {
  src: string;
  options: SoundOptions;
  audio: HTMLAudioElement;
  playing: boolean;

  constructor(src: string, options: SoundOptions = {}) {
    this.playing = false;
    this.src = src;
    this.options = { volume: 1, ...options };

    // Configure audio element
    const audio = Assets.sound(src);
    audio.src = src;
    if (options.loop) {
      audio.loop = true;
    }
    audio.addEventListener(
      'error',
      () => {
        throw Error(`Error loading audio: ${src}`);
      },
      false,
    );

    audio.addEventListener(
      'ended',
      () => {
        this.playing = false;
      },
      false,
    );
    this.audio = audio;
  }

  play(overrides: SoundOptions = {}) {
    const { audio, options } = this;
    const opts: SoundOptions = { time: 0, ...options, ...overrides };
    audio.volume = opts.volume;
    audio.currentTime = opts.time;
    audio.play();
    this.playing = true;
  }

  stop() {
    this.audio.pause();
    this.playing = false;
  }

  get volume() {
    return this.audio.volume;
  }

  set volume(volume) {
    this.options.volume = this.audio.volume = volume;
  }
}
