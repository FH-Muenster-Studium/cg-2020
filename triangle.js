import {gl, shaderProgram} from "./webglstart.js";
import SGNode from "./scenegraph/sgnode.js";

export default class Triangle extends SGNode {

    constructor(v1, v2, v3, color) {
        super("Triangle");
        this.vertices = [
            v1[0], v1[1], v1[2],
            v2[0], v2[1], v2[2],
            v3[0], v3[1], v3[2]
        ];

        if (color == null) {
            this.colors = [
                0.0, 1.0, 0.2, 1.0,
                1.0, 1.0, 0.4, 1.0,
                1.0, 1.0, 0.3, 1.0
            ];
        }
        else {
            this.colors = color;
        }

        this.initBuffers();
    }

    initBuffers() {
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        /*this.verticesColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);*/
    }

    draw() {
        //bindBuffer() immer vor vertexAttribPointer() ausführen,
        //damit der gebundene Buffer in die zugehörige Shader Variable geladen wird!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

        /*gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT, false, 0, 0);*/


        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
}
