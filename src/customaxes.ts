let THREE = require('three');

/**
 * Custom axes for three.js.
 * 
 * @export
 * @param {THREE.Scene} scene 
 * @param {boolean} [params={
 *     axisThickness: 3,
 *     axisLength: 100,
 *     coneRadius: 2,
 *     coneHeight: 15,
 *     invertedZ: false
 *   }] 
 */
export default function CustomAxes(
  scene: THREE.Scene,
  params = {
    axisThickness: 3,
    axisLength: 100,
    coneRadius: 2,
    coneHeight: 15,
    invertedZ: false
  }
) {
  let axisThickness = params.axisThickness;
  let axisLength = params.axisLength;
  let coneRadius = axisThickness * params.coneRadius;
  let coneHeight = params.coneHeight;

  let centerGeometry = new THREE.SphereBufferGeometry(coneRadius);
  let centerMaterial = new THREE.MeshBasicMaterial({ color: 0x999999});
  let center = new THREE.Mesh(centerGeometry, centerMaterial);

  let geometry = new THREE.CylinderBufferGeometry(axisThickness, axisThickness, axisLength, 20);
  let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  let xAxis = new THREE.Mesh(geometry, material);
  let coneGeometry = new THREE.ConeBufferGeometry( coneRadius, coneHeight, 20 );
  let xCone = new THREE.Mesh(coneGeometry, centerMaterial);

  geometry = new THREE.CylinderBufferGeometry(axisThickness, axisThickness, axisLength, 20);
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  let yAxis = new THREE.Mesh(geometry, material);
  coneGeometry = new THREE.ConeBufferGeometry( coneRadius, coneHeight, 20 );
  let yCone = new THREE.Mesh(coneGeometry, centerMaterial);

  geometry = new THREE.CylinderBufferGeometry(axisThickness, axisThickness, axisLength, 20);
  material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  let zAxis = new THREE.Mesh(geometry, material);
  coneGeometry = new THREE.ConeBufferGeometry( coneRadius, coneHeight, 20 );
  let zCone = new THREE.Mesh(coneGeometry, centerMaterial);

  let loader = new THREE.FontLoader();
  loader.load( '/fonts/helvetiker_regular.typeface.json', (font: any) => {

    let northGeometry = new THREE.TextBufferGeometry( 'N', {
      font: font,
      size: 20,
      height: 2,
      curveSegments: 12
    } );
    let eastGeometry = new THREE.TextBufferGeometry( 'E', {
      font: font,
      size: 20,
      height: 2,
      curveSegments: 12
    } );

    northGeometry.translate(-30, axisLength - 20, 0);
    eastGeometry.translate(axisLength - 20, -30, 0);

    let textMesh = new THREE.Mesh(northGeometry, centerMaterial);
    let text2Mesh = new THREE.Mesh(eastGeometry, centerMaterial);
    scene.add(textMesh);
    scene.add(text2Mesh);
  } );

  xAxis.translateX(axisLength / 2);
  xAxis.rotateZ(Math.PI / 2);
  xCone.translateX(axisLength + coneHeight / 2);
  xCone.rotateZ(-Math.PI / 2);
  yAxis.translateY(axisLength / 2);
  yCone.translateY(axisLength + coneHeight / 2);

  if (params.invertedZ) {
    /** Negative because we invert Z axis. */
    zAxis.translateZ(-axisLength / 2);
    zAxis.rotateX(Math.PI / 2);
    zCone.translateZ(-axisLength - coneHeight / 2);
    zCone.rotateX(-Math.PI / 2);
  } else {
    zAxis.translateZ(axisLength / 2);
    zAxis.rotateX(Math.PI / 2);
    zCone.translateZ(axisLength + coneHeight / 2);
    zCone.rotateX(Math.PI / 2);
  }

  scene.add(center);
  scene.add(xAxis);
  scene.add(xCone);
  scene.add(yAxis);
  scene.add(yCone);
  scene.add(zAxis);
  scene.add(zCone);
}