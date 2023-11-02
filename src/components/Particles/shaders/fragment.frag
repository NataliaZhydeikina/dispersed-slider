precision mediump float;
varying float traveled;
void main() {
    if(length(gl_PointCoord.xy - vec2(0.5)) > 0.5) discard;
    float alpha = 1. - traveled;
    gl_FragColor = vec4(1.0, 1.0, 1.0, 0.4*alpha);
}