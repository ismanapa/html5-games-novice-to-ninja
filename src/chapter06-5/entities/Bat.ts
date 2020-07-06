import {
  TileSprite, Texture, Coordinates, math,
} from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';
import { BatBehaviour } from './BatBehaviour';
import { State } from '~gamelib/State';
import { Player } from './Player';

const texture = new Texture(tiles);

export enum BatStates {
  ATTACK,
  EVADE,
  WANDER
}

export class Bat extends TileSprite {
  waypoint: Coordinates;
  speed: number;
  dir: { x: number; y: number; };
  state: State<BatStates>;
  target: Player;

  constructor(target: Player) {
    super(texture, 48, 48);
    this.hitBox = {
      x: 6,
      y: 6,
      w: 30,
      h: 26,
    };
    this.frame.x = 3;
    this.frame.y = 1;
    this.dir = {
      x: -1,
      y: 0,
    };
    this.speed = math.rand(180, 300);
    this.target = target;
    this.waypoint = null;

    this.state = new State(BatStates.ATTACK);
    this.updateBehaviour = new BatBehaviour();
  }
}
