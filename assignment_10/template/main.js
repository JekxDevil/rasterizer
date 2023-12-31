// -------------Shaders for the terrain rendering----------------
var vertexTerrainShaderCode = null;
var fragmentTerrainShaderCode = null;
var vertexShaderCode = null;
var fragmentShaderCode =  null;

var gl; // WebGL context
var shaderProgram; // the GLSL program we will use for rendering
var cube_vao; // the vertex array object for the cube
var sphere_vao; // the vertex array object for the sphere
var plane_vao; // the vertex array object for the plane

var terrain_vao; // the vertex array object for the terrain
var terrainShaderProgram; // shader program for rendering the terrain


function createGLSLProgram(program, vertCode, fragCode) {
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    compileShader(vertexShader, vertCode, gl.VERTEX_SHADER, "Vertex shader");
    // Creating fragment shader
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    compileShader(fragmentShader, fragCode, gl.VERTEX_SHADER, "Fragment shader");
    // Creating and linking the program
    linkProgram(program, vertexShader, fragmentShader);
}

function createGLSLPrograms() {
    shaderProgram = gl.createProgram();
    createGLSLProgram(shaderProgram, vertexShaderCode, fragmentShaderCode);

    //------------- Creating shader program for the terrain rendering ---------------
    terrainShaderProgram = gl.createProgram();
    createGLSLProgram(terrainShaderProgram, vertexTerrainShaderCode, fragmentTerrainShaderCode);
}

function createVAO(vao, shader, vertices, normals, colors) {
    // a buffer for vertices
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // a buffer for color
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    // a buffer for normals
    let normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    // bind VAO
    gl.bindVertexArray(vao);

    // position attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    let positionAttributeLocation = gl.getAttribLocation(shader, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    // color attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    let colorAttributeLocation = gl.getAttribLocation(shader, "a_color");
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    // normal attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    let normalAttributeLocation = gl.getAttribLocation(shader, "a_normal");
    gl.enableVertexAttribArray(normalAttributeLocation);
    gl.vertexAttribPointer(normalAttributeLocation, 3, gl.FLOAT, false, 0, 0);
}

function initBuffers() {
    cube_vao = gl.createVertexArray();
    createVAO(cube_vao, shaderProgram, cube_vertices, cube_normals, cube_colors);
    sphere_vao = gl.createVertexArray();
    createVAO(sphere_vao, shaderProgram, sphere_vertices, sphere_vertices, sphere_colors);
    plane_vao = gl.createVertexArray();
    createVAO(plane_vao, shaderProgram, plane_vertices, plane_normals, plane_colors);


    //------------- Creating VBO and VAO for terrain ---------------

    terrain_vao = gl.createVertexArray();

    let terrainVertices = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertices);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(terrain_vertices), gl.STATIC_DRAW);

    let uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(terrain_vertices), gl.STATIC_DRAW);

    gl.bindVertexArray(terrain_vao);

    gl.bindBuffer(gl.ARRAY_BUFFER, terrainVertices);
    let positionAttributeLocation = gl.getAttribLocation(terrainShaderProgram, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    let uvAttributeLocation = gl.getAttribLocation(terrainShaderProgram, "a_uv");
    gl.enableVertexAttribArray(uvAttributeLocation);
    gl.vertexAttribPointer(uvAttributeLocation, 3, gl.FLOAT, false, 0, 0);
}

function draw() {
    let camera_azimuthal_angle = document.getElementById("camera_azimuthal_angle").value / 360 * 2 * Math.PI;
    let camera_polar_angle = document.getElementById("camera_polar_angle").value / 360 * 2 * Math.PI;
    let camera_distance = document.getElementById("camera_distance").value / 10;
    let camera_fov = document.getElementById("camera_fov").value / 360 * 2 * Math.PI;
    let light_azimuthal_angle = document.getElementById("light_azimuthal_angle").value / 360 * 2 * Math.PI;
    let light_polar_angle = document.getElementById("light_polar_angle").value / 360 * 2 * Math.PI;

    // computing the camera position from the angles
    let camera_x = camera_distance * Math.sin(camera_polar_angle) * Math.cos(camera_azimuthal_angle);
    let camera_y = camera_distance * Math.cos(camera_polar_angle);
    let camera_z = -camera_distance * Math.sin(camera_polar_angle) * Math.sin(camera_azimuthal_angle);
    let camera_position = vec3.fromValues(camera_x, camera_y, camera_z);

    // computing the light direction from the angles
    let light_x = Math.sin(light_polar_angle) * Math.cos(light_azimuthal_angle);
    let light_y = Math.cos(light_polar_angle);
    let light_z = -Math.sin(light_polar_angle) * Math.sin(light_azimuthal_angle);
    let lightDirection = vec3.fromValues(light_x, light_y, light_z);

    // view matrix
    let viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, camera_position, vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0));
    // projection matrix
    let projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, camera_fov, 1.0, 0.1, 40.0);

    // model matrix (only definition, the value will be set when drawing a specific object)
    let modelMatrix = mat4.create();

    // set the size of our rendering area
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);

    // setting the background color and clearing the color buffer
    gl.clearColor(0.2, 0.2, 0.2, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    // enable the GLSL program for the rendering
    gl.useProgram(shaderProgram);

    // getting the locations of uniforms
    let modelMatrixLocation = gl.getUniformLocation(shaderProgram, "modelMatrix");
    let viewMatrixLocation = gl.getUniformLocation(shaderProgram, "viewMatrix");
    let projectionMatrixLocation = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    let lightDirectionLocation = gl.getUniformLocation(shaderProgram, "lightDirection");

    // setting the uniforms which are common for the entires scene
    gl.uniformMatrix4fv(viewMatrixLocation, false, viewMatrix);
    gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
    gl.uniform3fv(lightDirectionLocation, lightDirection);

    //drawing the sphere
    gl.bindVertexArray(sphere_vao);
    mat4.fromTranslation(modelMatrix, vec3.fromValues(0.0, 0.5, 0.0));
    mat4.scale(modelMatrix, modelMatrix, vec3.fromValues(0.1, 0.1, 0.1));
    gl.uniformMatrix4fv(modelMatrixLocation, false, modelMatrix);
    gl.drawArrays(gl.TRIANGLES, 0, sphere_vertices.length / 3);

    //-----------------------------------------------
    //---------- Drawing the terrain-----------------
    //-----------------------------------------------

    // You have to start using the new shader program for terrain rendering.
    // Remember to pass all the matrices and the illumination information
    // Remember to get first all the locations of the uniforms in the new GLSL program
    // and then set up the values their values.
    // Note that the code for setting up the textures
    // is already provided below.
    gl.useProgram(terrainShaderProgram);


    let tScale = gl.getUniformLocation(terrainShaderProgram, "scale");

    let tViewMatrixLocation = gl.getUniformLocation(
        terrainShaderProgram,
        "viewMatrix"
    );
    let tModelMatrixLocation = gl.getUniformLocation(
        terrainShaderProgram,
        "modelMatrix"
    );
    let tLightDirectionLocation = gl.getUniformLocation(
        terrainShaderProgram,
        "lightDirection"
    );
    let tProjectionMatrixLocation = gl.getUniformLocation(
        terrainShaderProgram,
        "projectionMatrix"
    );

    let tViewMatrix = mat4.create();
    mat4.lookAt(
        tViewMatrix,
        camera_position,
        vec3.fromValues(0, 0, 0),
        vec3.fromValues(0, 1, 0)
    );

    let tProjectionMatrix = mat4.create();
    mat4.perspective(
        tProjectionMatrix,
        camera_fov,
        gl.viewportWidth / gl.viewportHeight,
        0.01,
        50
    );
    // ------------ Setting up the textures ----------------
    for (let i = 0; i < terrainTextures.length; i++) {
        let textureLocation = gl.getUniformLocation(
            terrainShaderProgram,
            terrainTextures[i].uniformName
        );

        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, terrainTextures[i].glTexture);
        gl.uniform1i(textureLocation, i);
    }

    // ------------ Rendering the terrain ----------------------
    gl.uniform1f(tScale, 0.3);

    gl.uniform3fv(tLightDirectionLocation, lightDirection);
    gl.uniformMatrix4fv(tModelMatrixLocation, false, mat4.create());
    gl.uniformMatrix4fv(tViewMatrixLocation, false, viewMatrix);
    gl.uniformMatrix4fv(tProjectionMatrixLocation, false, projectionMatrix);

    gl.bindVertexArray(terrain_vao);
    gl.drawArrays(gl.TRIANGLES, 0, terrain_vertices.length / 3);

    window.requestAnimationFrame(function () {
        draw();
    });
}

// The function below creates textures and sets default parameters
// Feel free to play around with them to see how your rendering changes
function createTextures() {
    for (let i = 0; i < terrainTextures.length; i++) {
        terrainTextures[i].glTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, terrainTextures[i].glTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, terrainTextures[i]);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
}

function start() {
    initWebGL();
    createGLSLPrograms();
    createTextures(); // creating textures on GPU
    initBuffers();
    draw();
}

var leftToRead; // variable for counting all the textures that were already read from the files
var terrainTextures = []; // array for storing all the texture information; it does not need to be changed

// a list of the paths to the files with textures
// add here the paths to the files from which the textures should be read
var textureFiles = [
    "../data/terrain_files/Lugano.png",
    "../data/water/baseColor.jpg",
    "../data/sand/baseColor.jpg",
    "../data/grass/baseColor.jpg",
    "../data/rocks/baseColor.jpg",
    "../data/snow/baseColor.jpg",
];
// textureVariables should contain the names of uniforms in the shader program
// IMPORTANT: if you are going to use the code we provide,
// make sure the names below are identical to the one you use in the shader program
var textureVariables = [
    "waterSampler",
    "sandSampler",
    "grassSampler",
    "rockSampler",
    "snowSampler",
];

function count_down() {
    leftToRead = leftToRead - 1;
    if (leftToRead === 0) {
        start();
    }
}

async function main() {
    // console.log("here");console.log(lib_gl);
    vertexTerrainShaderCode = await (await fetch('glsl/shader-terrain.vert')).text();
    fragmentTerrainShaderCode = await (await fetch('glsl/shader-terrain.frag')).text();
    vertexShaderCode = await (await fetch('glsl/shader.vert')).text();
    fragmentShaderCode = await (await fetch('glsl/shader.frag')).text();

    // Loading the textures
    leftToRead = textureFiles.length;
    if (leftToRead === 0) {
        start();
    } else {
        for (let i = 0; i < textureFiles.length; i++) {
            terrainTextures.push(new Image());
            terrainTextures[i].src = textureFiles[i];
            terrainTextures[i].onload = count_down;
            terrainTextures[i].uniformName = textureVariables[i];
        }
    }
}
