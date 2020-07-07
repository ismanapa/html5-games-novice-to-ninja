
export class Vec {
  x: number;
  y: number;

  static from(v: Vec) {
    return new Vec().copy(v);
  }

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  mag(): number {
    const { x, y } = this;
    return Math.sqrt(x * x + y * y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  copy({ x, y }: Vec) {
    this.x = x;
    this.y = y;
    return this;
  }

  add({ x, y }: Vec) {
    this.x += x;
    this.y += y;
    return this;
  }

  subtract({ x, y }: Vec) {
    this.x -= x;
    this.y -= y;
    return this;
  }

  multiply(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  divide(s: number) {
    this.x /= s;
    this.y /= s;
    return this;
  }

  clone() {
    return Vec.from(this);
  }

  normalize() {
    const mag = this.mag();
    if (mag > 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  dot({ x, y }: Vec) {
    return this.x * x + this.y * y;
  }
}
