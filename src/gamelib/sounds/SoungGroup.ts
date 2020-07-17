import { Sound } from './Sound';
import { SoundOptions } from './SoundTypes';
import { math } from '~gamelib/utils/math';

export class SoundGroup {
  sounds: Sound[];

  constructor(sounds: Sound[]) {
    this.sounds = sounds;
  }

  // play one of the audio group (random)
  play(opts: SoundOptions = {}) {
    const { sounds } = this;
    math.randOneFrom(sounds).play(opts);
  }

  // stop ALL audio instance of the group
  stop() {
    this.sounds.forEach(sound => sound.stop());
  }
}
