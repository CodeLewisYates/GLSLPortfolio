export const fshader = `

varying vec2 v_uv;
varying vec3 v_position;

varying vec3 vBarycentric;

void main(){

  vec3 b = vBarycentric;
  float borderwidth = 0.01;

  // float borderx = max(step(v_uv.x, borderwidth), step(1.-v_uv.x,borderwidth));
  // float bordery = max(step(v_uv.y, borderwidth), step(1.-v_uv.y,borderwidth));
  // float border = max(borderx,bordery);
 
  float border = max(max(step(b.x, borderwidth), step(b.y, borderwidth)), step(b.z, borderwidth));
  vec3 color = vec3(border);

  //gl_FragColor = vec4(v_uv, 0., 1.);
  // 1, .5, .02
  vec3 orange = vec3(1.,.5,.1) * border;
  vec3 test = vec3(v_uv.x,0.1, v_uv.y*.5) * border;

  gl_FragColor = vec4(test, 1.);
}

`;
