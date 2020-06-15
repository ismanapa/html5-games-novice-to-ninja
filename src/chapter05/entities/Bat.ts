import {
  TileSprite, Texture, Coordinates, math,
} from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';
import { BatBehaviour } from './BatBehaviour';

const texture = new Texture(tiles);

export class Bat extends TileSprite {
  findWaypoint: () => Coordinates;
  waypoint: Coordinates;
  speed: number;
  dir: { x: number; y: number; };

  constructor(findWaypoint: () => Coordinates) {
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
    this.findWaypoint = findWaypoint;
    this.waypoint = findWaypoint();

    this.updateBehaviour = new BatBehaviour();
  }
}
