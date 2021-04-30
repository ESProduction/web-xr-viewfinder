import * as THREE from 'three';
var panoL, panoR, planeL, planeR, context, scene;

export function setup(ctx) {

  const assets = ctx.assets;
  scene = assets['stereo_planes'].scene;

  const geometrySphere = new THREE.SphereBufferGeometry(500, 60, 40);
  //const geometryPlane = new THREE.PlaneBufferGeometry(100, 100);

  const video01 = document.getElementById('video01');
  const videoTexture01 = new THREE.VideoTexture(video01);

  const materialVidL = new THREE.MeshBasicMaterial( { map: videoTexture01, side: THREE.DoubleSide } );
  const materialVidR = new THREE.MeshBasicMaterial( { map: videoTexture01, side: THREE.DoubleSide } );

 // const materialL = new THREE.MeshBasicMaterial( { map: assets['stereopanoL'], side: THREE.BackSide } );
 // const materialR = new THREE.MeshBasicMaterial( { map: assets['stereopanoL'], side: THREE.BackSide } );
  
  
  //Shorter named var for 3d scene components.
  scene.getObjectByName('left_stereo_plane').material = materialVidL;
  scene.getObjectByName('right_stereo_plane').material = materialVidR;
  scene.getObjectByName('right_stereo_plane').layers.set(1);
  scene.getObjectByName('left_stereo_plane').layers.set(2);


  //panoL = new THREE.Mesh(geometrySphere, materialVidL);
  //panoL.layers.set(1);
  //panoR = new THREE.Mesh(geometrySphere, materialR);
  //panoR.layers.set(2);



  ctx.raycontrol.addState('panoramaStereo', {
    raycaster: false,
    onSelectEnd: onSelectEnd
  });
}

export function enter(ctx) {
  ctx.renderer.setClearColor(0x000000);
  ctx.camera.add(scene);
  //ctx.scene.add(panoL);
  //ctx.scene.add(panoR);
  //planeL.position.set(0,0,-20);
  //planeR.position.set(0,0,-20);
  //planeL.rotation.set(0,0,90);
  //planeR.rotation.set(0,0,90);
  ctx.camera.layers.enable(1);
  context = ctx;

  ctx.raycontrol.activateState('panoramaStereo');
}

export function exit(ctx) {
  //ctx.scene.remove(panoL);
  //ctx.scene.remove(panoR);
  ctx.camera.layers.disable(1);
  ctx.raycontrol.deactivateState('panoramaStereo');
}

export function execute(ctx, delta, time) {
}

export function onSelectEnd(evt) {
  context.goto = 0;
}

