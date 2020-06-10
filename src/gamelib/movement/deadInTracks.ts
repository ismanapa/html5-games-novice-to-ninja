import { Entity } from '../entities/Entity';
import { TileMap } from '../entities/TileMap';
import { entity } from '../utils/entity';

export const deadInTracks = (ent: Entity, map: TileMap, x = 0, y = 0) => {
  const bounds = entity.bounds(ent);
  const tiles = map.tilesAtCorners(bounds, x, y);
  const walks = tiles.map(t => t && t.frame.walkable);
  const blocked = walks.some(w => !w);
  if (blocked) {
    x = 0;
    y = 0;
  }
  return { x, y };
};
