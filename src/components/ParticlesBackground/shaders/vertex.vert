uniform float time;
float PI = 3.141592653589793238;
attribute float aSize;
attribute float aVelocity;
attribute float aDistance;
attribute float aRandom;
varying float vRandom;
void main() {
  vRandom = aRandom;
  vec3 pos = position;
  pos.x = mod(0.2*aVelocity*time-aRandom, 1.);
  pos.x = (pos.x - 0.5)*5.;
  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize = aSize * ( 1.0 / -mvPosition.z );
	gl_Position = projectionMatrix * mvPosition;
}