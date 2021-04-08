export const particlefragment = `
  uniform float progress;
  uniform float u_time;
  uniform sampler2D texture;
  varying vec2 v_uv;
  varying vec3 v_position;

  void main(){
    vec3 color = vec3(1.);
    gl_FragColor = vec4(color, .2);
  }
`;
