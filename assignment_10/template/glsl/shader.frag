#version 300 es
precision highp float;

in vec3 v_color;
in vec3 v_viewDirection;
in vec3 v_normal;
in vec3 v_lightDirection;

const vec3 lightColor = vec3(1.0,1.0,1.0);
const float ambientCoeff = 0.05;
const float diffuseCoeff = 0.5;
const float specularCoeff = 0.5;
const float shininessCoeff = 50.0;

const float gamma = 1.8;

out vec4 out_color;
void main(){

    vec3 V = normalize(v_viewDirection);
    vec3 N = normalize(v_normal);
    vec3 L = normalize(v_lightDirection.xyz);
    vec3 R = normalize(reflect(-L,N));

    vec3 ambient = ambientCoeff * v_color;
    vec3 diffuse = vec3(diffuseCoeff) * lightColor * v_color * vec3(max(dot(N,L), 0.0));
    vec3 specular = vec3(specularCoeff) * vec3(pow(max(dot(R,V), 0.0), shininessCoeff));

    vec3 color = ambient + diffuse + specular;
    color = pow(color,vec3(1.0/gamma));
    out_color = vec4(color, 1.0);
}
