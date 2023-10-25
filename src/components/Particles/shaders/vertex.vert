uniform float time;
varying vec3 vPosition;
varying vec2 vUv;
attribute float aDistance;
attribute float aVelocity;
attribute float aSize;
float PI = 3.14159;
void main() {
    vUv = uv;
    vec3 pos = position;
    pos.x = mod(aVelocity*time, aDistance);
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
    gl_PointSize = aSize * (1. / mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
// varying vec2 vUv;
// void main() {
//   vUv = uv;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }