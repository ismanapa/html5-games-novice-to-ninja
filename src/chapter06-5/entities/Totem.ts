import {
  TileSprite, Texture, entity, math,
} from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';
import { Player } from './Player';
import { Bullet } from './Bullet';
import { TotemBehaviour } from './TotamBehaviour';

const texture = new Texture(tiles);

export class Totem extends TileSprite {
  target: Player;
  onFire: (b: Bullet) => void;
  fireIn: number;
  baddieType: string;

  constructor(target: Player, onFire: (b: Bullet) => void) {
    super(texture, 48, 48);
    this.baddieType = 'Totem';
    this.frame.x = 2;
    this.frame.y = 1;
    this.target = target;
    this.onFire = onFire;
    this.fireIn = 0;

    this.updateBehaviour = new TotemBehaviour();
  }

  fireAtTarget() {
    const { target, onFire } = this;
    const totemPos = entity.center(this);
    const targetPos = entity.center(target);
    const angle = math.angle(targetPos, totemPos);

    const x = Math.cos(angle);
    const y = Math.sin(angle);

    const bullet = new Bullet({ x, y }, 300);
    bullet.pos.x = totemPos.x - bullet.w / 2;
    bullet.pos.y = totemPos.y - bullet.h / 2;

    onFire(bullet);
  }
}
