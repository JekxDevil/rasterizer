/**
 * The function initialize the WebGL canvas
  */
function initWebGL() {
    const canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");

    //keep the size of the canvas for later rendering
    gl.viewportWidth = canvas.width;
    gl.viewportHeight = canvas.height;

    //check for errors
    if (gl) {
        console.log("WebGL successfully initialized.");
    } else {
        console.log("Failed to initialize WebGL.")
    }
}


/**
 * This function compiles a shader
 */
function compileShader(shader, source, type, name = "") {
    gl.shaderSource(shader, source);    // link the source of the shader to the shader object
    gl.compileShader(shader);   // compile the shader
    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS); // check for success and errors
    if (success) {
        console.log(name + " shader compiled successfully.");
    } else {
        console.log(name + " vertex shader error.")
        console.log(gl.getShaderInfoLog(shader));
    }
}

/**
 * This function links the GLSL program by combining different shaders
  */
function linkProgram(program, vertShader, fragShader) {
    gl.attachShader(program, vertShader);   // attach vertex shader to the program
    gl.attachShader(program, fragShader);   // attach fragment shader to the program
    gl.linkProgram(program);    // link the program
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {  // check for success and errors
        console.log("The shaders are initialized.");
    } else {
        console.log("Could not initialize shaders.");
    }
}
