export const particlevertex = `

uniform float u_time;

varying vec3 v_position;
varying vec2 v_uv;

void main(){
  v_uv = uv;
  v_position = position;

  vec3 newpos = position;
  newpos.y += 0.1*(sin(newpos.y*10. + u_time));
  //newpos.z += 0.05*(sin(newpos.y*10. + u_time));

  vec4 mvPos = modelViewMatrix * vec4(newpos, 2.);
  gl_PointSize = 5. * (1. / - mvPos.z);
  gl_Position = projectionMatrix * mvPos;
}

`;
