export class State<T> {
  last: T;
  state: T;
  time: number;
  justSetState: boolean;
  first: boolean;

  constructor(state: T) {
    this.set(state);
  }

  set(state: T) {
    this.last = this.state;
    this.state = state;
    this.time = 0;
    this.justSetState = true;
    this.first = true;
  }

  get() {
    return this.state;
  }

  update(dt: number) {
    this.first = this.justSetState;
    this.time += this.first ? 0 : dt;
    this.justSetState = false;
  }

  is(state: T) {
    return this.state === state;
  }

  isIn(...states: T[]) {
    return states.some(s => this.is(s));
  }
}
