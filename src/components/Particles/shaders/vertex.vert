uniform float time;
float PI = 3.141592653589793238;
attribute float aSize;
attribute float aVelocity;
attribute float aDistance;
varying float traveled;
void main() {
  vec3 pos = position;
  pos.x = mod(0.8*aVelocity*time, aDistance);
  traveled = pos.x;
  pos.x*=.2;
  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize = aSize * ( 1.0 / -mvPosition.z );
	gl_Position = projectionMatrix * mvPosition;
}