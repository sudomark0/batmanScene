import * as THREE from 'three';
import { Howl, Howler } from 'howler';
import EventEmitter from './EventEmitter.js';
import Experience from '../Experience.js';

export default class Sound extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.camera = this.experience.camera.instance;
    this.resources = this.experience.resources;
    this.soundsCreated = false;
  }

  isTabVisible() {
    return document.visibilityState === 'visible';
  }

  handleVisibilityChange() {
    if (this.isTabVisible()) {
      this.backgroundSound.play();
      this.rainSound.play();
    } else {
      this.backgroundSound.pause();
      this.rainSound.pause();
      this.listener.setMasterVolume(0);
    }
  }

  createSounds() {
    if (this.soundsCreated === true) return;

    this.backgroundSound = new Howl({
      src: ['sounds/backgroundSound.wav'],
      volume: 0.3,
      loop: true,
    });

    this.rainSound = new Howl({
      src: ['sounds/rain.mp3'],
      volume: 0.1,
      loop: true,
    });

    this.backgroundSound.play();
    this.rainSound.play();

    // console.log(this.backgroundSound);

    // this.listener = new THREE.AudioListener();
    // this.camera.add(this.listener);

    // this.backgroundSound = new THREE.Audio(this.listener);
    // this.backgroundSound.setBuffer(this.resources.items.backgroundSound);
    // this.backgroundSound.setLoop(true);
    // this.backgroundSound.setVolume(0.1);
    // this.backgroundSound.play();

    // this.rainSound = new THREE.Audio(this.listener);
    // this.rainSound.setBuffer(this.resources.items.rainSound);
    // this.rainSound.setLoop(true);
    // this.rainSound.setVolume(0.08);
    // this.rainSound.play();

    this.soundsCreated = true;

    document.addEventListener(
      'visibilitychange',
      () => this.handleVisibilityChange(),
      false
    );
  }
}
