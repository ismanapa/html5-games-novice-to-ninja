import { Engine, World, Events } from 'matter-js';
import {
  Container, Game, MouseControls, KeyControls, Vec, UpdateBehaviour, ContainerUpdateBehaviour, math,
} from '~gamelib';

import { Course } from './Course';
import { Penguin } from './entities/Penguin';
import { Arrow } from './entities/Arrow';

type Controls = {
  mouse: MouseControls,
  keys: KeyControls
};

export class GameScreen extends Container {
  ready: boolean;
  onHole: () => void;
  mouse: MouseControls;
  penguin: Penguin;
  course: Course;
  engine: Engine;
  arrow: Arrow;

  constructor(game: Game, controls: Controls, onHole: () => void) {
    super();
    this.w = game.w;
    this.h = game.h;

    this.ready = false;
    this.onHole = onHole;
    this.mouse = controls.mouse;

    const course = new Course({ x: 450, y: 300 } as Vec);
    const penguin = new Penguin({ x: this.w / 2, y: -32 } as Vec);
    const arrow = new Arrow();

    // Add everyone to the game
    this.penguin = this.add(penguin);
    this.course = this.add(course);
    this.arrow = this.add(arrow);

    // Set up the physics engine
    this.engine = Engine.create({
      enableSleeping: true,
    });
    World.add(this.engine.world, [penguin.body, course.body]);
    Events.on(penguin.body, 'sleepStart', () => {
      this.ready = true;
    });

    Engine.run(this.engine);

    this.updateBehaviour = new GameScreenBehaviour();
  }

  fireAway(angle: number, power: number) {
    const { penguin, arrow } = this;

    // this.setScore(1);
    this.ready = false;
    arrow.visible = false;
    penguin.fire(angle, power);
  }

}

class GameScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: GameScreen): void {
    super.update(dt, t, entity);

    const {
      penguin, h, mouse, arrow,
    } = entity;

    // Gone off the edge?
    if (penguin.pos.y > h) {
      entity.onHole();
    }

    // Start your stroke
    if (mouse.pressed) {
      arrow.start(mouse.pos as Vec);
    }

    if (mouse.isDown || mouse.released) {
      const { angle, power } = arrow.drag(mouse.pos as Vec);
      if (mouse.released) {
        entity.fireAway(angle, power * 0.021);
      }
    }

    mouse.update();
  }
}
