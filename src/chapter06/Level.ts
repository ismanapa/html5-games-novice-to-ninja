import {
  TileMap, Texture, math, Coordinates,
} from '~gamelib';

import tiles from './res/images/bravedigger-tiles.png';

const texture = new Texture(tiles);

const tileIndexes = [
  {
    id: 'empty', x: 0, y: 2, walkable: true,
  },
  { id: 'wall', x: 2, y: 3 },
  { id: 'wall3D', x: 3, y: 3 },
];

const ascii = `
#########################
#####                ####
###                B  ###
##                 ##  ##
#       ########       ##
#   ##       ###        #
#B            ####      #
###             ##      T
####   ##T##    ####    #
#####                  ##
###                  ####
##    ##                #
#   #####        ########
# ########    T##########
#X          #############
#########################`;

type Spawns = {
  player: Coordinates;
  bats: Coordinates[];
  totems: Coordinates[];
  pickups: Coordinates[];
};

export class Level extends TileMap {
  spawns: Spawns;

  constructor() {
    const tileSize = 48;

    const spawns: Spawns = {
      player: null,
      totems: [],
      bats: [],
      pickups: [],
    };

    const cells = ascii.split('\n').slice(1).map(row => row.split(''));

    const mapH = cells.length;
    const mapW = cells.reduce((max, row) => Math.max(max, row.length), 0);

    // "pad out" the rows so they are all the same length
    const padded = cells.map(row => {
      const extra = mapW - row.length;
      return [...row, ...Array(extra).fill(' ')];
    });

    // Find spawns, and replace with correct tiles
    const level: number[] = padded
      .map((row, y) => row.map((cell, x) => {
        switch (cell) {
          case '#':
            return 1;
          case 'T':
            spawns.totems.push({ x, y });
            return 1;
          case 'B':
            spawns.bats.push({ x, y });
            return 0;
          case 'X':
            spawns.player = { x, y };
            return 0;
          default:
            return 0;
        }
      }))
      .reduce((ac, el) => [...ac, ...el]);

    // "3d-ify" if no wall below a tile
    for (let y = 1; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        const above = level[(y - 1) * mapW + x];
        const me = level[y * mapW + x];
        if (me === 1 && tileIndexes[above].walkable) {
          level[y * mapW + x] = 2;
        }
      }
    }

    // const getTile = (id: string) => tileIndexes.find(t => t.id === id);
    // const getIdx = (id: string) => tileIndexes.indexOf(getTile(id));

    super(
      level.map(i => tileIndexes[i]),
      mapW,
      mapH,
      tileSize,
      tileSize,
      texture,
    );

    // Map spawn points to pixel locations
    this.spawns = {
      player: this.mapToPixelPos(spawns.player),
      bats: spawns.bats.map(b => this.mapToPixelPos(b)),
      totems: spawns.totems.map(t => this.mapToPixelPos(t)),
      pickups: spawns.pickups.map(p => this.mapToPixelPos(p)),
    };
  }

  findFreeSpot(isFree = true) {
    const { mapW, mapH } = this;
    let found = false;
    let x;
    let y;
    while (!found) {
      x = math.rand(mapW);
      y = math.rand(mapH);
      const { frame } = this.tileAtMapPos({ x, y });
      if (!!frame.walkable === isFree) {
        found = true;
      }
    }
    return this.mapToPixelPos({ x, y });
  }

  findTreasureSpot() {
    const { mapW, mapH } = this;
    let found = false;
    let x;
    let y;
    while (!found) {
      x = math.rand(mapW);
      y = math.rand(mapH);
      const { frame, pos } = this.tileAtMapPos({ x, y });
      const underFrame = this.tileAtMapPos({ x, y: y + 1 });
      if (frame.walkable && underFrame && !underFrame.frame.walkable) {
        found = true;
      }
    }
    return this.mapToPixelPos({ x, y });
  }
}
