import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Batman {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Batman');
      this.debugFolder.close();
    }

    // Resource
    this.resource = this.resources.items.batmanModel;

    this.setModel();
    // this.setAnimation();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.scale.set(0.7, 0.7, 0.7);
    this.model.position.set(0, 0.0, 0);
    this.model.rotation.set(0, -1.5, 0);
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    if (this.debug.active) {
      this.debugFolder
        .add(this.model.position, 'x')
        .name('batmanX')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.position, 'y')
        .name('batmanY')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.position, 'z')
        .name('batmanZ')
        .min(-30)
        .max(30)
        .step(0.001);
      this.debugFolder
        .add(this.model.rotation, 'x')
        .name('batmanRotationX')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.rotation, 'y')
        .name('batmanRotationY')
        .min(-30)
        .max(30)
        .step(0.001);

      this.debugFolder
        .add(this.model.rotation, 'z')
        .name('batmanRotationZ')
        .min(-30)
        .max(30)
        .step(0.001);
    }
  }

  update() {
    // this.animation.mixer.update(this.time.delta * 0.001);
  }
}
