export const vshader = `

uniform float u_time;
varying vec2 v_uv;
varying vec3 v_position;

attribute vec3 barycentric;
varying vec3 vBarycentric;

void main(){
  v_uv = uv;
  v_position = position;

  vBarycentric = barycentric;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}

`;
