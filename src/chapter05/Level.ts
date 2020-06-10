import { TileMap, Texture, math } from '~gamelib';

import tiles from './res/images/bravedigger-tiles.png';

const texture = new Texture(tiles);

export class Level extends TileMap {
  constructor(w: number, h: number) {
    const tileSize = 48;
    const mapW = Math.floor(w / tileSize);
    const mapH = Math.floor(h / tileSize);

    const tileIndexes = [
      { id: 'empty', x: 1, y: 2 },
      { id: 'wall', x: 2, y: 2 },
      { id: 'wall_end', x: 3, y: 2 },
    ];

    const getTile = (id: string) => tileIndexes.find(t => t.id === id);
    const getIdx = (id: string) => tileIndexes.indexOf(getTile(id));

    // Make a random dungeon
    const level = Array(mapW * mapH).fill(0);
    for (let y = 0; y < mapH; y++) {
      for (let x = 0; x < mapW; x++) {
        // Define the dungeon walls
        // level[y * mapW + x] = math.randOneFrom([0, 0, 1]);

        // 1. Map borders
        if (y === 0 || x === 0 || y === mapH - 1 || x === mapW - 1) {
          level[y * mapW + x] = 1;
          continue;
        }

        // 2. Grid points - randomly skip some to make "rooms"
        if (y % 2 || x % 2 || math.randOneIn(4)) {
          continue; // don't draw a wall, please.
        }
        level[y * mapW + x] = 1;

        // 3. Side walls - pick a random direction
        const [xo, yo] = math.randOneFrom([[0, -1], [0, 1], [1, 0], [-1, 0]]);
        level[(y + yo) * mapW + (x + xo)] = 1;
      }
    }

    // "3d-ify" if no wall below a tile
    for (let y = 0; y < mapH - 1; y++) {
      for (let x = 0; x < mapW; x++) {
        const below = level[(y + 1) * mapW + x];
        const me = level[y * mapW + x];
        if (me === getIdx('wall') && below !== getIdx('wall')) {
          level[y * mapW + x] = getIdx('wall_end');
        }
      }
    }

    super(
      level.map(i => tileIndexes[i]),
      mapW,
      mapH,
      tileSize,
      tileSize,
      texture,
    );
  }
}
