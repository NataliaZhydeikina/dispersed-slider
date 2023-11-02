uniform float time;
float PI = 3.141592653589793238;
attribute float aSize;
attribute float aVelocity;
attribute float aDistance;
void main() {
  vec3 pos = position;
  pos.x = mod(aVelocity*time, aDistance);
  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_PointSize = aSize * ( 1.0 / -mvPosition.z );
	gl_Position = projectionMatrix * mvPosition;
}