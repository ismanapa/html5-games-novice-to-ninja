import { Container, Vec, Rect, math } from '~gamelib';

export class Arrow extends Container {
  max: number;
  maxDragDistance: number;
  background: Rect;
  arrow: Rect;

  constructor(max = 100) {
    super();
    this.pos = new Vec();
    this.max = max;
    this.maxDragDistance = 80;

    this.background = this.add(
      new Rect(max, 4, { fill: 'rgba(0, 0, 0, 0.1)' }),
    );
    this.arrow = this.add(new Rect(0, 4, { fill: '#FDA740' }));
  }

  start(pos: Vec) {
    this.pos.copy(pos);
  }

  drag(drag: Vec) {
    const {
      arrow, pos, max, maxDragDistance,
    } = this;

    const angle = math.angle(pos, drag);
    const dist = math.distance(pos, drag);
    const power = Math.min(1, dist / maxDragDistance);

    this.rotation = angle;
    arrow.w = power * max;

    return {
      angle,
      power,
    };
  }
}