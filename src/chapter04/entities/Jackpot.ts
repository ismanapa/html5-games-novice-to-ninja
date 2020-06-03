
import { Texture, TileSprite, math } from '~gamelib';

import jackpot from '../res/images/jackpots.png';

const BONUS_WORD = 'jackpots';

export class Jackpot extends TileSprite {
  name: string;
  letter: string;
  static BONUS_WORD: string;

  constructor() {
    super(new Texture(jackpot), 32, 32);
    this.name = BONUS_WORD;
    this.letter = math.randOneFrom(BONUS_WORD.split(''));
    this.frame.x = BONUS_WORD.indexOf(this.letter);
  }
}

Jackpot.BONUS_WORD = BONUS_WORD;