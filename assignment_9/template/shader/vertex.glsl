#version 300 es

in vec3 a_position;
in vec3 a_color;
in vec3 a_normal;

out vec3 v_color;
out vec3 v_normal;
out vec3 v_viewDirection;
out vec3 v_lightDirection;


uniform vec3 lightDirection;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 translationMatrix;
uniform vec3 viewDirection;
uniform mat4 viewMatrix;



void main() {
    v_color = a_color;


    v_viewDirection = vec3(projectionMatrix * vec4(0.0, 0.0, -1.0, 0.0));
    v_lightDirection = vec3(viewMatrix * vec4(lightDirection, 0.0));

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(a_position, 1.0);
    v_normal = vec3(viewMatrix * modelMatrix * vec4(a_normal, 0.0));

}