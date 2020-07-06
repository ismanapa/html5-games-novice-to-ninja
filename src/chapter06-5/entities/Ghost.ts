import {
  TileSprite, Texture, entity, UpdateBehaviour,
} from '~gamelib';

import tiles from '../res/images/bravedigger-tiles.png';
import { Player } from './Player';
import { Level } from '../Level';
import { Entity } from '~gamelib/entities/Entity';

const texture = new Texture(tiles);

export class Ghost extends TileSprite {
  speed: number;
  target: Player;
  waypoint: any;
  map: Level;
  path: any;

  constructor(target: Player, map: Level) {
    super(texture, 48, 48);
    this.hitBox = {
      x: 6,
      y: 3,
      w: 32,
      h: 32,
    };
    this.frame.x = 5;
    this.frame.y = 1;
    this.speed = 100;
    this.target = target;
    this.waypoint = null;
    this.map = map;

    this.updateBehaviour = new GhostBehaviour();
  }

  findPath() {
    // Calculate the path-finding path
    const { map, target } = this;
    const s = map.pixelToMapPos(entity.center(this));
    const d = map.pixelToMapPos(entity.center(target));
    const start = performance.now();
    const s2 = Date.now();
    map.path.findPath(s.x, s.y, d.x, d.y, path => {
      this.path = path || [];
      const end = performance.now();
      console.log(`Pathfinding took ${end - start} ms`, Date.now() - s2);
    });
    map.path.calculate();
  }
}

class GhostBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: Ghost): void {
    const { pos } = entity;
    this.followPath(dt, entity);
    // Bob spookily
    pos.y += Math.sin(t / 0.1) * 0.5;
  }

  followPath(dt: number, entity: Ghost) {
    const {
      map, speed, path, pos, hitBox,
    } = entity;
    // Move along the path
    if (!path.length) {
      return;
    }

    const cell = entity.path[0];
    // Move in the direction of the path
    const xo = cell.x * map.tileW - (pos.x - hitBox.x);
    const yo = cell.y * map.tileH - (pos.y - hitBox.y);

    const closeX = Math.abs(xo) <= 2;
    const closeY = Math.abs(yo) <= 2;
    if (!closeX) pos.x += Math.sign(xo) * speed * dt;
    if (!closeY) pos.y += Math.sign(yo) * speed * dt;

    // If you made it, move to the next path element
    if (closeX && closeY) {
      entity.path = path.slice(1);
      if (entity.path.length === 0) {
        entity.findPath();
      }
    }
  }
}
