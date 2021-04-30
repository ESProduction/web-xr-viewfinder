import * as THREE from 'three';

const PATH_TIME = 1; // 3 secs per path

var slideshow = {};

slideshow.paths = [
  //'hall'
  [    {
    from: new THREE.Vector3(0, 0, 0),
    lookAt: new THREE.Vector3(0, 0, -100),
    velocity: new THREE.Vector3(0, 0, 0),
    angularVelocity: new THREE.Vector3(0.03, 0.05, 0)
  }
  ],
  //'sound'
  [
  ],
  //'photogrammetry'
  [
    
  ],
  //'vertigo'
  [
  ],
  //'panoramastereo'
  [
  ],
  //'panorama1'
  [
  ],
  //'panorama2'
  [
  ],
  //'panorama3'
  [
  ],
  //'panorama4'
  [
  ],
  //'panorama5'
  [
  ]
];

slideshow.setup = function (context) {
  this.room = undefined;
  this.path = undefined;
  this.next(context);
  context.camera.position.set(0, 1.6, 0);
  context.cameraRig.position.set(0, 0, 2);
  context.goto = this.room;
};

slideshow.next = function (context) {
  this.time = PATH_TIME + Math.random() * PATH_TIME / 2;
  if (this.room === undefined) {
    this.room = 0;
    this.path = 0;
  } else {
    this.path ++;
    if (this.path >= this.paths[this.room].length){
      // find next room with paths
      do {
        this.room ++;
        if (this.room >= this.paths.length) {
          this.room = 0;
          context.cameraRig.position.set(0, 0, 2);
        }
      } while (!this.paths[this.room].length);
      var camera = context.renderer.xr.getCamera(context.camera);
      camera.position.set(0, 1.6, 0);
      context.goto = this.room;
      this.path = 0;
    }
  }
  this.reset = true;
};

slideshow.execute = function (context, delta, time) {
  const path = this.paths[this.room][this.path];
  if (this.reset) {
    this.reset = false;
    // init camera settings
    context.camera.position.copy(path.from);
    context.camera.rotation.set(0, 0, 0);
    context.camera.lookAt(path.lookAt);
  }
  
  this.time -= delta;
  if (this.time < 0) {
    this.next(context);
  }
};

export {slideshow};
