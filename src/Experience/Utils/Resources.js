import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AudioLoader } from 'three/src/loaders/AudioLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import Sound from './Sound.js';

import EventEmitter from './EventEmitter.js';

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.allLoaded = false;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.manager = new THREE.LoadingManager();

    this.loaders.gltfLoader = new GLTFLoader(this.loaders.manager);
    this.loaders.dracoLoader = new DRACOLoader(this.loaders.manager);
    this.loaders.dracoLoader.setDecoderPath('/draco/');
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.loaders.AudioLoader = new THREE.AudioLoader();
  }

  startLoading() {
    // Load each source
    const loadingBarElement = document.querySelector('.loadingBar');
    const loadingLayerElement = document.querySelector('.loadingLayer');
    this.loaders.manager.onStart = function (url, itemsLoaded, itemsTotal) {};
    this.loaders.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      this.progressRatio = itemsLoaded / itemsTotal;

      loadingBarElement.style.transform = `scaleX(${this.progressRatio})`;
    };
    this.loaders.manager.onLoad = function () {
      console.log('Loading complete!');
      setTimeout(() => {
        loadingBarElement.classList.add('hidden');
        loadingLayerElement.classList.add('hidden');
      }, 1500);
    };
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'texture') {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'cubeTexture') {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'font') {
        this.loaders.fontLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === 'audio') {
        this.loaders.AudioLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger('ready');
      this.allLoaded = true;
    }
  }
}
