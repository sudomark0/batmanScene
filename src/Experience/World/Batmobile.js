import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Batmobile {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Batmobile');
      this.debugFolder.close();
    }

    // Resource
    this.resource = this.resources.items.batmobileModel;

    this.setModel();
    // this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.2, 0.2, 0.2);
    this.model.position.set(0, 0.15, 1.5);
    this.model.rotation.set(0, 0.4, 0);
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    if (this.debug.active) {
      this.debugFolder
        .add(this.model.position, 'x')
        .name('batmobileX')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.position, 'y')
        .name('batmobileY')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.position, 'z')
        .name('batmobileZ')
        .min(-30)
        .max(30)
        .step(0.001);
      this.debugFolder
        .add(this.model.rotation, 'x')
        .name('batmobileRotationX')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.rotation, 'y')
        .name('batmobileRotationY')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.rotation, 'z')
        .name('batmobileRotationZ')
        .min(-30)
        .max(30)
        .step(0.001);
    }
  }

  update() {
    // this.animation.mixer.update(this.time.delta * 0.001);
  }
}
