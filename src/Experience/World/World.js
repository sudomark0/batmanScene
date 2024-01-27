import Experience from '../Experience.js';
import Environment from './Environment.js';
import Floor from './Floor.js';
import Moon from './Moon.js';
import Batman from './Batman.js';
import Batmobile from './Batmobile.js';
import BatmanEmblem from './BatmanEmblem.js';
import Rain from './Rain.js';
import City from './City.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.html = this.experience.html;
    this.sound = this.experience.sound;

    this.progress = this.resources.loaded / this.resources.toLoad;

    // Wait for resources
    this.resources.on('ready', () => {
      // Setup
      this.rain = new Rain();
      this.floor = new Floor();
      this.batman = new Batman();
      this.batmobile = new Batmobile();
      this.city = new City();
      this.batmanEmblem = new BatmanEmblem();
      this.environment = new Environment();
      this.moon = new Moon();
      this.sound.createSounds();
    });
  }

  update() {
    if (this.batman) this.batman.update();
    if (this.batmobile) this.batmobile.update();
    if (this.batmanEmblem) this.batmanEmblem.update();
    if (this.rain) this.rain.update();
  }
}
