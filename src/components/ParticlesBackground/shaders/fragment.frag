precision mediump float;
varying float vRandom;
void main() {
    if(length(gl_PointCoord.xy - vec2(0.5)) > 0.5) discard;
    vec3 finalColor = mix(vec3(0.61, 0.50, 0.92), vec3(0.345, 0.281, 0.543), mod(vRandom, 0.5));
    gl_FragColor = vec4(finalColor, 0.4);
}