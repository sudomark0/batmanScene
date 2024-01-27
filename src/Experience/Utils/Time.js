import EventEmitter from './EventEmitter.js';

import Stats from 'stats.js';

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.stats = new Stats();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    //Stats setup
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
    this.stats.begin();

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this.trigger('tick');

    this.stats.end();

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
