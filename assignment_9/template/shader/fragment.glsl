#version 300 es

precision mediump float;

in vec3 frag_color;
in vec3 frag_normal;
in vec3 frag_view_direction;
in vec3 frag_light_direction;

const vec3 ambient_coeff = vec3(0.1);
const vec3 diffuse_coeff = vec3(0.5);
const vec3 specular_coeff = vec3(0.5);
const float shininess = 80.0;

out vec4 out_color;

void main() {
    vec3 normal = normalize(frag_normal);
    vec3 view_direction = normalize(frag_view_direction);
    vec3 light_direction = normalize(frag_light_direction);
    vec3 reflected_direction = normalize(reflect(-light_direction, normal));

    vec3 ambient = ambient_coeff;
    vec3 diffuse = diffuse_coeff * clamp(dot(light_direction, normal), 0.0, 1.0);
    vec3 specular = specular_coeff * pow(clamp(dot(reflected_direction, view_direction), 0.0, 1.0), shininess);
    vec3 color_raw = frag_color * (ambient + diffuse + specular);

    vec3 gamma_correction = pow(color_raw, vec3(1.0 / 1.8));

    out_color = vec4(gamma_correction, 1.0);
}