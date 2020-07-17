import { Engine, World, Events } from 'matter-js';
import {
  Container, Game, MouseControls, KeyControls, Vec,
  UpdateBehaviour, ContainerUpdateBehaviour, math,
  Text,
  Rect,
  entity,
} from '~gamelib';

import { Course } from './Course';
import { Penguin } from './entities/Penguin';
import { Arrow } from './entities/Arrow';

type Controls = {
  mouse: MouseControls,
  keys: KeyControls
};

type Stats = {
  hole: number,
  shots: number,
  total: number,
};

export class GameScreen extends Container {
  ready: boolean;
  onHole: (completed: boolean, shots: number) => void;
  mouse: MouseControls;
  penguin: Penguin;
  course: Course;
  engine: Engine;
  arrow: Arrow;
  shots: number;
  total: number;
  scoreText: Text;
  waves: Rect;
  keys: KeyControls;

  constructor(
    game: Game,
    controls: Controls,
    onHole: (completed: boolean, shots: number) => void,
    stats: Stats,
  ) {
    super();
    this.w = game.w;
    this.h = game.h;

    this.ready = false;
    this.onHole = onHole;
    this.mouse = controls.mouse;
    this.keys = controls.keys;

    // Score
    this.shots = stats.shots;
    this.total = stats.total;

    const title = this.add(new Text('Pengolfin', {
      font: '32pt Freckle Face, cursive',
      align: 'left',
      fill: '#fff',
    }));

    title.pos.set(20, 20);

    this.scoreText = this.add(
      new Text('', { font: '24pt Freckle Face, cursive', fill: '#fff', align: 'right' })
    );
    this.scoreText.pos.set(game.w - 20, 20);
    this.setScore();

    const course = new Course(this.w, this.h);
    const penguin = new Penguin(course.tee);
    const arrow = new Arrow();

    const hole = new Rect(20, 10, { fill: '#FDA740' });
    hole.pos.copy(course.hole).add({ x: 0, y: 15 } as Vec);
    this.add(new Text(stats.hole.toString(), { font: '14pt Freckle Face, cursive', fill: '#000' }))
      .pos.copy(hole.pos)
      .add({ x: 5 - (stats.hole > 9 ? 5 : 0), y: -20 } as Vec);

    // Add everyone to the game
    this.penguin = this.add(penguin);
    this.course = this.add(course);
    this.course = this.add(course);
    this.waves = this.add(new Rect(this.w, 50, { fill: '#1e5799' }));
    this.arrow = this.add(arrow);

    // Set up the physics engine
    this.engine = Engine.create({
      enableSleeping: true,
    });
    World.add(this.engine.world, [penguin.body, course.body]);
    Events.on(penguin.body, 'sleepStart', () => {
      // Are we in the hole?
      if (entity.hit(penguin, hole)) {
        this.onHole(true, this.shots);
      }
      this.ready = true;
      arrow.visible = true;
    });

    Engine.run(this.engine);

    this.updateBehaviour = new GameScreenBehaviour();
  }

  setScore(shots = 0) {
    this.shots += shots;
    this.scoreText.text = `Strokes: ${this.shots}   Total: ${this.total}`;
  }

  fireAway(angle: number, power: number) {
    const { penguin, arrow } = this;

    this.setScore(1);
    this.ready = false;
    arrow.visible = false;
    penguin.fire(angle, power);
  }
}

class GameScreenBehaviour extends ContainerUpdateBehaviour implements UpdateBehaviour {
  update(dt: number, t: number, entity: GameScreen): void {
    super.update(dt, t, entity);

    const {
      arrow, penguin, h, mouse, waves,
    } = entity;

    // Gone off the edge?
    if (penguin.pos.y > h) {
      entity.setScore(5); // 5 stroke penalty!
      entity.onHole(false, entity.shots);
    }

    // Start your stroke
    if (mouse.pressed) {
      arrow.start(mouse.pos as Vec);
    }

    if (entity.ready) {
      if (mouse.isDown || mouse.released) {
        const { angle, power } = arrow.drag(mouse.pos as Vec);
        if (mouse.released) {
          entity.fireAway(angle, power * 0.021);
        }
      }
      // Skip the current hole
      if (entity.keys.action) {
        entity.setScore(5); // 5 stroke penalty!
        entity.onHole(true, entity.shots);
      }
    }

    waves.pos.y = Math.sin(t / 800) * 7 + entity.h - 20;
    mouse.update();
  }
}
