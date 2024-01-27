import * as THREE from 'three';
import Experience from '../Experience.js';

export default class City {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // this.setGeometry();
    // this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {}

  setTextures() {
    this.textures = {};

    this.textures.color = this.resources.items.grassColorTexture;
    this.textures.normal = this.resources.items.grassNormalTexture;
    this.textures.aoMap = this.resources.items.grassAOTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;

    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.normal.repeat.set(1.5, 1.5);
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;

    this.textures.aoMap.repeat.set(1.5, 1.5);
    this.textures.aoMap.wrapS = THREE.RepeatWrapping;
    this.textures.aoMap.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({
      color: '#000000',
    });
  }

  setMesh() {
    this.countBuildings = 20;

    this.geometries = [];
    this.meshes = [];
    this.i;

    for (this.i = 0; this.i < this.countBuildings; this.i++) {
      this.geometries.push(
        (this.geometry = new THREE.BoxGeometry(
          1,
          Math.floor(Math.random() * 6) + 1,

          1
        ))
      );

      this.meshes.push(new THREE.Mesh(this.geometries[this.i], this.material));

      this.meshes[this.i].position.x = -13;
      this.meshes[this.i].position.z += this.i + 0.3 - 10;
      this.scene.add(this.meshes[this.i]);

      // if (this.i <= 10) {
      //   console.log(this.i);
      //   // this.meshes[this.i].position.z += +this.i + 1;
      //   this.meshes[this.i].position.z = this.i - 10;
      //   this.scene.add(this.meshes[this.i]);
      // } else {
      //   this.meshes[this.i].position.z = this.i - 10;

      //   this.scene.add(this.meshes[this.i]);
      // }
    }
  }
}
// this.mesh.position.x = -13;

// this.mesh.rotation.x = -Math.PI * 0.5;
// this.mesh.receiveShadow = true;
// this.mesh.castShadow = true;
