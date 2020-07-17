
import { Sound } from './Sound';
import { SoundOptions } from './SoundTypes';

export class SoundPool {
  count: number;
  sounds: Sound[];

  constructor(src: string, options: SoundOptions = {}, poolSize = 3) {
    this.count = 0;
    this.sounds = [...Array(poolSize)]
      .map(() => new Sound(src, options));
  }

  // play one of audio instance of the pool
  play(options: SoundOptions) {
    const { sounds } = this;
    const index = this.count++ % sounds.length;
    sounds[index].play(options);
  }

  // stop ALL audio instance of the pool
  stop() {
    this.sounds.forEach(sound => sound.stop());
  }
}