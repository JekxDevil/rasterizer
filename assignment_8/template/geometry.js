//------------ Assignment ----------------
// Add vertices for the cube as well as colors for corresponding vertices.
// Remember that:
// (1) The vertices for each triangle has to be provided in a counter-clockwise order to make the face culling work properly. If the order of vertices won't be correct the triangles won't be visible.
// (2) The current coordinate system has: x-axis pointing right, y-axis pointing up, and z-axis pointing towards the screen
// (3) Everything which is within [-1..1]x[-1..1]x[-1..1] volume will be projected onto the screen along z-axis
//-----------------------------------------
var cube_vertices = [
    // Front
    0.5, 0.5, 0.5, // A
    -0.5, 0.5, 0.5, // D
    -0.5, -0.5, 0.5, // C
    
    0.5, 0.5, 0.5, // A
    -0.5, -0.5, 0.5, // C
    0.5, -0.5, 0.5, // B
    
    // Right
    0.5, 0.5, 0.5, // A
    0.5, -0.5, 0.5, // B
    0.5, -0.5, -0.5, // E

    
    0.5, 0.5, -0.5, // F
    0.5, 0.5, 0.5, // A
    0.5, -0.5, -0.5, // E


    // Left
    -0.5, 0.5, 0.5, // D
    -0.5, -0.5, -0.5, // G
    -0.5, -0.5, 0.5, // C
    

    -0.5, 0.5, 0.5, // D
    -0.5, 0.5, -0.5, // H
    -0.5, -0.5, -0.5, // G

    // Top
    -0.5, 0.5, 0.5, // D
    0.5, 0.5, 0.5, // A
    -0.5, 0.5, -0.5, // H

    0.5, 0.5, 0.5, // A
    0.5, 0.5, -0.5, // F
    -0.5, 0.5, -0.5, // H

    // Bottom
    0.5, -0.5, 0.5, // B
    -0.5, -0.5, 0.5, // C
    -0.5, -0.5, -0.5, // G

    0.5, -0.5, -0.5, // E
    0.5, -0.5, 0.5, // B
    -0.5, -0.5, -0.5, // G

    // Back
    0.5, -0.5, -0.5, // E
    -0.5, -0.5, -0.5, // G
    0.5, 0.5, -0.5, // F

    -0.5, -0.5, -0.5, // G
    -0.5, 0.5, -0.5, // H
    0.5, 0.5, -0.5, // F
];
var cube_colors = [
    ...Array(6).fill([1, 0, 0]).flat(),
    ...Array(6).fill([0, 1, 0]).flat(),
    ...Array(6).fill([0, 0, 1]).flat(),
    ...Array(6).fill([0, 1, 1]).flat(),
    ...Array(6).fill([1, 1, 0]).flat(),
    ...Array(6).fill([1, 1, 1]).flat(),
];
