import Triangle from "./triangle.js";
import {gl, shaderProgram} from "./webglstart.js";

export default class Rectangle {

    constructor(v1, v2, v3, v4) {
        this.triangle1 = new Triangle(v1, v2, v3);
        this.triangle2 = new Triangle(v1, v3, v4);

        //Dreieck unten links
        this.uv1 = [
            0,0, //oben links
            0,1, //unten links
            1,1 //unten rechts
        ];

        this.uv2 = [
            1,1, // unten rechts
            1,0, //oben rechts
            0,0 //oben links
        ];
        this.initBuffers();
    }

    initBuffers() {
        this.texturePositionBuffer1 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer1);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv1), gl.STATIC_DRAW);

        this.texturePositionBuffer2 = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer2);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv2), gl.STATIC_DRAW);
    }

    draw() {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer1);
        gl.vertexAttribPointer(shaderProgram.texturePositionAttribute, 2, gl.FLOAT, false, 0, 0);
        this.triangle1.draw();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer2);
        gl.vertexAttribPointer(shaderProgram.texturePositionAttribute, 2, gl.FLOAT, false, 0, 0);
        this.triangle2.draw();
    }
}
