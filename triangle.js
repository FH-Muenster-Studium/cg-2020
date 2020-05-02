import {gl, shaderProgram} from "./webglstart.js";

export default class Triangle {

    constructor(v1, v2, v3) {
        this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2]
        ];

        this.initBuffers();
    }

    initBuffers() {
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    }

    draw() {
        //bindBuffer() immer vor vertexAttribPointer() ausführen,
        //damit der gebundene Buffer in die zugehörige Shader Variable geladen wird!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}
