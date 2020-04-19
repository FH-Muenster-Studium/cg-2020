// Globale Variablen:
var gl;
var triangle;
var square;
var cube;
var shaderProgram;
var modelViewMatrix = mat4.create();
var rotationMatrix = mat4.create();
var projectionMatrix = mat4.create();

// Globale Funktionen:
function webGLStart() {
    var canvas = document.getElementById("glCanvas");
    initGL(canvas);
    initShaders();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    console.log(gl.getParameter(gl.VERSION));
    console.log(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));

    // Zusammensetzen eines Dreieck
    var v1 = vec3.create();
    vec3.set(v1, -0.75, 0.75, 0.0);

    var v2 = vec3.create();
    vec3.set(v2, -0.75, -0.75, 0.0);

    var v3 = vec3.create();
    vec3.set(v3, 0.75, -0.75, 0.0);

    var v4 = vec3.create();
    vec3.set(v4, -0.75, 0.75, 0.75);

    var v5 = vec3.create();
    vec3.set(v5, -0.75, -0.75, -0.75);

    var v6 = vec3.create();
    vec3.set(v6, 0.75, -0.75, 0.75);

    triangle = new Triangle(v1,v2,v3);
    square = new Square(v1, v2, v3);
    cube = new Cube(v4,v5,v6);

    drawScene();
}

function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    if (!gl) {
        alert("Could not initialise WebGL, sorry :-(");
    }
}

function initShaders() {
    var fragmentShader = getShaderFromHTML("shader-fs");
    var vertexShader = getShaderFromHTML("shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
    shaderProgram.mMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
    shaderProgram.rMatrixUniform = gl.getUniformLocation(shaderProgram, "uRotationMatrix");
}

function getShaderFromHTML(id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function drawScene() {
    console.log("draw:" + modelViewMatrix);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.identity(projectionMatrix);
    mat4.identity(modelViewMatrix);

    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderProgram.mMatrixUniform, false, modelViewMatrix);
    gl.uniformMatrix4fv(shaderProgram.rMatrixUniform, false, rotationMatrix);

    //triangle.draw();
    //square.draw();
    cube.draw();

    // Ermöglicht Echtzeit Rendering und Animation
    window.requestAnimationFrame(drawScene);
}
