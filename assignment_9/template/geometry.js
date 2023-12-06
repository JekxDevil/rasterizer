// definition of a plane
var plane_vertices = [
    -0.5, 0.0, -0.5,
    -0.5, 0.0, 0.5,
    0.5, 0.0, 0.5,
    -0.5, 0.0, -0.5,
    0.5, 0.0, 0.5,
    0.5, 0.0, -0.5,
];
var plane_normals = [
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
];

var plane_colors = [
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


var cube_colors = [
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

var cube_normals = [];

function compute_normals(vertices, normals) {
    for (var i = 0; i < vertices.length; i += 9) {
        var v1 = vec3.fromValues(vertices[i], vertices[i + 1], vertices[i + 2]);
        var v2 = vec3.fromValues(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
        var v3 = vec3.fromValues(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

        var v1v2 = vec3.create();
        var v1v3 = vec3.create();

        vec3.subtract(v1v2, v2, v1);
        vec3.subtract(v1v3, v3, v1);

        var n = vec3.create();
        vec3.cross(n, v1v2, v1v3);
        vec3.normalize(n, n);

        for (var j = 0; j < 3; j++) {
            normals.push(n[0], n[1], n[2]);
        }
    }
}
compute_normals(cube_vertices, cube_normals);

//---------------------------
// definition of the sphere
//---------------------------
var sphere_vertices = [];
var sphere_colors = [];
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
    }
}

create_sphere();
