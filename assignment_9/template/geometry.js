// definition of a plane
const plane_vertices = [
    -0.5, 0.0, -0.5,
    -0.5, 0.0, 0.5,
    0.5, 0.0, 0.5,
    -0.5, 0.0, -0.5,
    0.5, 0.0, 0.5,
    0.5, 0.0, -0.5,
];
const plane_normals = [
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
];

const plane_colors = [
    0.56, 0.45, 0.4,
    0.56, 0.45, 0.4,
    0.56, 0.45, 0.4,
    0.56, 0.45, 0.4,
    0.56, 0.45, 0.4,
    0.56, 0.45, 0.4,
];

//---------------------------
// definition of the cube
//---------------------------
const cube_vertices = [
    // Front face
    -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, 0.5,

    // Back face
    0.5, -0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, -0.5, -0.5,
    -0.5, 0.5, -0.5,

    // Top face
    -0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,
    -0.5, 0.5, -0.5,
    -0.5, 0.5, 0.5,
    0.5, 0.5, 0.5,
    0.5, 0.5, -0.5,

    // Bottom face
    -0.5, -0.5, 0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    0.5,-0.5, -0.5,
    0.5, -0.5, 0.5,

    // Right face
    0.5, -0.5, 0.5,
    0.5, -0.5, -0.5,
    0.5, 0.5, -0.5,
    0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, -0.5,

    // Left face
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, 0.5,
];


const cube_colors = [
    // Front face
    ...Array(6).fill([1, 0, 0,]).flat(),
    // Back face
    ...Array(6).fill([1, 0, 0,]).flat(),

    // Top face
    ...Array(6).fill([0, 1, 0,]).flat(),
    // Bottom face
    ...Array(6).fill([0, 1, 0,]).flat(),

    // Left face
    ...Array(6).fill([0, 0, 1,]).flat(),
    // Right face
    ...Array(6).fill([0, 0, 1,]).flat(),

];

const cube_normals = [];

function compute_normals(vertices, normals) {

    for (let i = 0; i < vertices.length; i += 9) {
        let p1 = i + 3;
        let p2 = i + 6;
        let p3 = i + 9;

    let v1 = vec3.fromValues(...vertices.slice(i, p1));
    let v2 = vec3.fromValues(...vertices.slice(p1, p2));
    let v3 = vec3.fromValues(...vertices.slice(p2, p3));

    let v4 = vec3.create();
    let v5 = vec3.create();

    let normal = vec3.create();

    vec3.subtract(v4, v2, v1);
    vec3.subtract(v5, v3, v1);

    vec3.cross(normal, v4, v5);
    vec3.normalize(normal, normal);

    normals.push(normal[0], normal[1], normal[2]);
    normals.push(normal[0], normal[1], normal[2]);
    normals.push(normal[0], normal[1], normal[2]);
  }
}
compute_normals(cube_vertices, cube_normals);


//---------------------------
// definition of the sphere
//---------------------------
const sphere_vertices = [];
const sphere_colors = [];
const sphere_normals = [];

function create_sphere() {
    let step = 0.01;
    for (let u = 0; u < 1; u = u + step) {
        for (let v = 0; v < 1; v = v + step) {
            let t = Math.sin(Math.PI * v);

            let x1 = t * Math.cos(2 * Math.PI * u);
            let z1 = t * Math.sin(2 * Math.PI * u);
            let y1 = Math.cos(Math.PI * v);

            let x4 = t * Math.cos(2 * Math.PI * (u + step));
            let z4 = t * Math.sin(2 * Math.PI * (u + step));
            let y4 = Math.cos(Math.PI * v);

            t = Math.sin(Math.PI * (v + step));
            let x2 = t * Math.cos(2 * Math.PI * u);
            let z2 = t * Math.sin(2 * Math.PI * u);
            let y2 = Math.cos(Math.PI * (v + step));

            let x3 = t * Math.cos(2 * Math.PI * (u + step));
            let z3 = t * Math.sin(2 * Math.PI * (u + step));
            let y3 = Math.cos(Math.PI * (v + step));

            sphere_vertices.push(x1, y1, z1, x3, y3, z3, x2, y2, z2);
            sphere_vertices.push(x1, y1, z1, x4, y4, z4, x3, y3, z3);

            for (let k = 0; k < 6; k++) {
                sphere_colors.push(1, 1, 1);
            }
        }
    }
    //making the sphere a unit sphere
    for (let i = 0; i < sphere_vertices.length; i++) {
        sphere_vertices[i] = sphere_vertices[i] / 2;
        sphere_normals[i] = sphere_vertices[i];

    }
}

create_sphere();
