export default [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      'textures/environmentMap/px.jpg',
      'textures/environmentMap/nx.jpg',
      'textures/environmentMap/py.jpg',
      'textures/environmentMap/ny.jpg',
      'textures/environmentMap/pz.jpg',
      'textures/environmentMap/nz.jpg',
    ],
  },
  {
    name: 'grassColorTexture',
    type: 'texture',
    path: 'textures/rubber/color.jpg',
  },
  {
    name: 'grassNormalTexture',
    type: 'texture',
    path: 'textures/rubber/normal.png',
  },
  {
    name: 'grassAOTexture',
    type: 'texture',
    path: 'textures/rubber/ao.jpg',
  },
  {
    name: 'moonColorTexture',
    type: 'texture',
    path: 'textures/moon/color.jpg',
  },
  {
    name: 'moonElevationMapTexture',
    type: 'texture',
    path: 'textures/moon/elevationMap.jpg',
  },
  {
    name: 'batmobileModel',
    type: 'gltfModel',
    path: 'models/Batmobile/batmobile.glb',
  },
  {
    name: 'batmanModel',
    type: 'gltfModel',
    path: 'models/batman/batman.glb',
  },

  {
    name: 'batmanEmblem',
    type: 'gltfModel',
    path: 'models/logo/logo.gltf',
  },
  {
    name: 'backgroundSound',
    type: 'audio',
    path: 'sounds/backgroundSound.mp3',
  },
  {
    name: 'rainSound',
    type: 'audio',
    path: 'sounds/rain.mp3',
  },
];
