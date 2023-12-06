#version 300 es

in vec3 position;
in vec3 color;
in vec3 normal;

out vec3 frag_color;
out vec3 frag_normal;
out vec3 frag_view_direction;
out vec3 frag_light_direction;

uniform vec3 light_direction;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
uniform mat4 translationMatrix;
uniform vec3 viewDirection;
uniform mat4 viewMatrix;

void main() {
    frag_view_direction = vec3(projectionMatrix * vec4(0.0, 0.0, -1.0, 0.0));
    frag_light_direction = vec3(viewMatrix * vec4(light_direction, 0.0));
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    frag_normal = vec3(viewMatrix * modelMatrix * vec4(normal, 0.0));
    frag_color = color;
}