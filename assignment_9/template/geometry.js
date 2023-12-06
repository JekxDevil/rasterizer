// definition of a plane
const plane = { vertices: [], colors: [], normals: []};
plane.vertices = [
    -0.5, 0.0, -0.5,
    -0.5, 0.0, 0.5,
    0.5, 0.0, 0.5,
    -0.5, 0.0, -0.5,
    0.5, 0.0, 0.5,
    0.5, 0.0, -0.5,
];
plane.normals = [
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
];

plane.colors = [
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
const cube = { vertices: [], colors: [], normals: []};

const cube_vertices_builder = (size) => {
    const halfSize = size / 2;

    const frontFace = [
        -halfSize,  halfSize,  halfSize,
        -halfSize, -halfSize,  halfSize,
        halfSize, -halfSize,  halfSize,
        -halfSize,  halfSize,  halfSize,
        halfSize, -halfSize,  halfSize,
        halfSize,  halfSize,  halfSize,
    ];

    const backFace = [
        halfSize, -halfSize, -halfSize,
        -halfSize, -halfSize, -halfSize,
        -halfSize,  halfSize, -halfSize,
        halfSize,  halfSize, -halfSize,
        halfSize, -halfSize, -halfSize,
        -halfSize,  halfSize, -halfSize,
    ];

    const topFace = [
        -halfSize,  halfSize,  halfSize,
        halfSize,  halfSize, -halfSize,
        -halfSize,  halfSize, -halfSize,
        -halfSize,  halfSize,  halfSize,
        halfSize,  halfSize,  halfSize,
        halfSize,  halfSize, -halfSize,
    ];

    const bottomFace = [
        -halfSize, -halfSize,  halfSize,
        -halfSize, -halfSize, -halfSize,
        halfSize, -halfSize, -halfSize,
        -halfSize, -halfSize,  halfSize,
        halfSize, -halfSize, -halfSize,
        halfSize, -halfSize,  halfSize,
    ];

    const rightFace = [
        halfSize, -halfSize,  halfSize,
        halfSize, -halfSize, -halfSize,
        halfSize,  halfSize, -halfSize,
        halfSize,  halfSize,  halfSize,
        halfSize, -halfSize,  halfSize,
        halfSize,  halfSize, -halfSize,
    ];

    const leftFace = [
        -halfSize,  halfSize, -halfSize,
        -halfSize, -halfSize, -halfSize,
        -halfSize, -halfSize,  halfSize,
        -halfSize,  halfSize, -halfSize,
        -halfSize, -halfSize,  halfSize,
        -halfSize,  halfSize,  halfSize,
    ];

    return [
        ...frontFace,
        ...backFace,
        ...topFace,
        ...bottomFace,
        ...rightFace,
        ...leftFace,
    ];
}
cube.vertices = cube_vertices_builder(1.0);

const cube_color_builder = (color, count) =>
    Array(count).fill(color).flat();

cube.colors = [
    ...cube_color_builder([1, 0, 0], 6),    // Front face
    ...cube_color_builder([1, 0, 0], 6),    // Back face
    ...cube_color_builder([0, 1, 0], 6),    // Top face
    ...cube_color_builder([0, 1, 0], 6),    // Bottom face
    ...cube_color_builder([0, 0, 1], 6),    // Left face
    ...cube_color_builder([0, 0, 1], 6),    // Right face
];

const compute_normals = (cube) => {

    for (let i = 0; i < cube.vertices.length; i += 9) {
        const p1 = i + 3;
        const p2 = i + 6;
        const p3 = i + 9;

    const v1 = vec3.fromValues(...cube.vertices.slice(i, p1));
    const v2 = vec3.fromValues(...cube.vertices.slice(p1, p2));
    const v3 = vec3.fromValues(...cube.vertices.slice(p2, p3));

    const v4 = vec3.create();
    const v5 = vec3.create();

    const normal = vec3.create();

    vec3.subtract(v4, v2, v1);
    vec3.subtract(v5, v3, v1);

    vec3.cross(normal, v4, v5);
    vec3.normalize(normal, normal);

    cube.normals.push(normal[0], normal[1], normal[2]);
    cube.normals.push(normal[0], normal[1], normal[2]);
    cube.normals.push(normal[0], normal[1], normal[2]);
  }
}
compute_normals(cube);


//---------------------------
// definition of the sphere
//---------------------------
const sphere = { vertices: [], colors: [], normals: []};

const sphere_builder = () => {
    const step = 0.01;

    for (let u = 0; u < 1; u += step) {
        for (let v = 0; v < 1; v += step) {
            const t = Math.sin(Math.PI * v);

            const x1 = t * Math.cos(2 * Math.PI * u);
            const z1 = t * Math.sin(2 * Math.PI * u);
            const y1 = Math.cos(Math.PI * v);

            const x4 = t * Math.cos(2 * Math.PI * (u + step));
            const z4 = t * Math.sin(2 * Math.PI * (u + step));
            const y4 = Math.cos(Math.PI * v);

            const t1 = Math.sin(Math.PI * (v + step));
            const x2 = t1 * Math.cos(2 * Math.PI * u);
            const z2 = t1 * Math.sin(2 * Math.PI * u);
            const y2 = Math.cos(Math.PI * (v + step));

            const x3 = t1 * Math.cos(2 * Math.PI * (u + step));
            const z3 = t1 * Math.sin(2 * Math.PI * (u + step));
            const y3 = Math.cos(Math.PI * (v + step));

            sphere.vertices.push(x1, y1, z1, x3, y3, z3, x2, y2, z2);
            sphere.vertices.push(x1, y1, z1, x4, y4, z4, x3, y3, z3);

            for (let k = 0; k < 6; k++) {
                sphere.colors.push(1, 1, 1);
            }
        }
    }

    // Making the sphere a unit sphere
    for (let i = 0; i < sphere.vertices.length; i++) {
        sphere.vertices[i] /= 2;
        sphere.normals[i] = sphere.vertices[i];
    }
};

sphere_builder();
