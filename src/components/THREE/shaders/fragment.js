export const fshader = `
  uniform vec2 u_mouse;
  uniform vec2 u_resolution;
  uniform vec3 u_color;
  uniform float u_time;
  uniform sampler2D landscape;
  varying vec2 v_uv;
  varying vec3 v_position;
  varying vec3 vColor;
  varying vec3 vNormal;

  void main(){
    vec3 color = vec3(1.);

    vec3 light = vec3(0.);
    vec3 skyColor = vec3(1.,1.,0.547);
    vec3 groundColor = vec3(0.562,0.275,0.111);
    vec3 lightDirection = normalize(vec3(0., -1., -1.));
    light += dot(lightDirection, vNormal);

    light = mix(skyColor,groundColor,dot(lightDirection,vNormal));

    //gl_FragColor = vec4(vNormal, 1.);
    gl_FragColor = vec4(light*vColor, 1.);
  }
`;
