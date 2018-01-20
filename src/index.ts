import * as THREE from 'three';
let OrbitControls = require('three-orbit-controls')(THREE);
import CustomAxes from './customaxis';

let axesRenderer: THREE.WebGLRenderer;
let axesScene: THREE.Scene;
let axesCamera: THREE.PerspectiveCamera;
let controls;

function enable () {
  let staticAxesContainer = document.getElementById("customAxes");

  /** Prepare scene for axis. */
  axesRenderer = new THREE.WebGLRenderer({ alpha: false });
  axesRenderer.setClearColor(0x000000, 0);
  axesRenderer.setSize(200, 200);
  staticAxesContainer.appendChild(axesRenderer.domElement);

  axesScene = new THREE.Scene();

  axesCamera = new THREE.PerspectiveCamera(
    50,
    200 / 200,
    1,
    1000
  );
  axesCamera.up.set(0, 0, 1);
  axesCamera.position.setZ(300);
  axesScene.add(axesCamera);

  /** Create and add axis. */
  CustomAxes(axesScene);
  
  /** Add controls. */
  controls = new OrbitControls(axesCamera, staticAxesContainer);
  controls.enableZoom = true;

  animate();
}
window.onload = () => enable();

function animate() {
  axesRenderer.render(axesScene, axesCamera);
  window.requestAnimationFrame(animate);
}