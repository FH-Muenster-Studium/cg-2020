import {vec3, mat4} from "./gl-matrix/index.js";
import Scene from "./scene.js";

// Globale Variablen:
var gl;
var scene;
var shaderProgram;
var modelViewMatrix = mat4.create();
var projectionMatrix = mat4.create();

// Globale Funktionen:
export function webGLStart() {
    var canvas = document.getElementById("glCanvas");
    initGL(canvas);
    initShaders();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    console.log(gl.getParameter(gl.VERSION));
    console.log(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));

    scene = new Scene();

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
    const fragmentShader = getShaderFromHTML("shader-fs");
    const vertexShader = getShaderFromHTML("shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    shaderProgram.normalPositionAttribute = gl.getAttribLocation(shaderProgram, "aNormalPosition");
    shaderProgram.texturePositionAttribute = gl.getAttribLocation(shaderProgram, "aTexturePosition");

    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.normalPositionAttribute);
    gl.enableVertexAttribArray(shaderProgram.texturePositionAttribute);

    shaderProgram.uNormalMatrixUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");

    shaderProgram.projectionMatrixUniform = gl.getUniformLocation(shaderProgram, "uProjectionMatrix");
    shaderProgram.modelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "uModelViewMatrix");
}

function getShaderFromHTML(id) {
    const shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    let str = "";
    let k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    let shader;
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

//const times = [];
//let fps;

function drawScene(now) {
    /*const now2 = performance.now();
    while (times.length > 0 && times[0] <= now2 - 1000) {
        times.shift();
    }
    times.push(now2);
    fps = times.length;*/

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(shaderProgram.projectionMatrixUniform, false, projectionMatrix);
    gl.uniformMatrix4fv(shaderProgram.modelViewMatrixUniform, false, modelViewMatrix);

    scene.draw(now);
    //console.log(fps);
    // Ermöglicht Echtzeit Rendering und Animation
    window.requestAnimationFrame(drawScene);
}

export {gl, shaderProgram, projectionMatrix, scene};