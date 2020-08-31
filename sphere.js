/*
 * by Kathrin Ungru, kathrin.ungru@fh-muenster.de
 * University of Applied Sciences Münster
 */
import {gl, shaderProgram} from "./webglstart.js";
import SGNode from "./scenegraph/sgnode.js";

export default class Sphere extends SGNode {
    /*
    * Zeichne Kugel mit TRIANGLE_STRIPs
    *
    *  ... * - * - * ...
    *      |  /|  /|
    *      | / | / |
    *  ... * - * - * ...
    *      .
    *      .
    *      0   2   4
    *  ... * - * - * ...
    *      |  /|  /|
    *      | / | / |
    *  ... * - * - * ...
    *      1   3   5
    *      .
    *      .
    *  ... * - * - * ...
    *      |  /|  /|
    *      | / | / |
    *  ... * - * - * ...
    */

    constructor(name, radius) {
        super(name);

        this.height = 2 * radius;

        this.vertexPositionData = [];
        this.vertexNormals = [];
        this.uv = [];

        const latitudeBands = 100;
        const longitudeBands = 100;

        // Erzeuge Punkte, af den Breiten- (latitudeBands) und Längengraden (longitudeBands) einer Kugel
        for (let i = 0; i <= latitudeBands; i++) {
            const theta = i * Math.PI / latitudeBands;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            const v = i / latitudeBands;  // Bessere/einfachere Variante mit prozentualem Anteil
            for (let j = 0; j <= longitudeBands; j++) {
                const phi = j * 2 * Math.PI / longitudeBands;
                const x = sinTheta * Math.sin(phi);
                const y = cosTheta;
                const z = sinTheta * Math.cos(phi);

                this.vertexNormals.push(x);
                this.vertexNormals.push(y);
                this.vertexNormals.push(z);

                this.vertexPositionData.push(radius * x);
                this.vertexPositionData.push(radius * y);
                this.vertexPositionData.push(radius * z);

                const u = j / longitudeBands; // Bessere/einfachere Variante mit prozentualem Anteil

                this.uv.push(u);
                this.uv.push(v);
            }
        }

        // Erzeuge Reihenfolge, in der die Punkte gezeichnet werden sollen
        this.indexData = [];
        for (let i = 0; i < latitudeBands; i++) {
            for (let j = 0; j < longitudeBands; j++) {
                const idx0 = (i * (longitudeBands + 1)) + j;
                const idx1 = idx0 + longitudeBands + 1;
                const idx2 = idx0 + 1;
                const idx3 = idx1 + 1;
                this.indexData.push(idx0);
                this.indexData.push(idx1);
                this.indexData.push(idx2);
                this.indexData.push(idx3);
            }
        }

        this.initBuffers();
    }

    getHeight() {
        return this.height;
    }

    initBuffers() {
        this.vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPositionData), gl.STATIC_DRAW);

        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexData), gl.STATIC_DRAW);

        this.normalPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals), gl.STATIC_DRAW);

        this.texturePositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uv), gl.STATIC_DRAW);
    }

    bindBuffers() {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalPositionBuffer);
        gl.vertexAttribPointer(shaderProgram.normalPositionAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.texturePositionBuffer);
        gl.vertexAttribPointer(shaderProgram.texturePositionAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    }

    draw() {

        this.bindBuffers();

        //Zeichnet Elemente im Array-Buffer gemäß Element-Indices im Index-Buffer
        gl.drawElements(gl.TRIANGLE_STRIP, this.indexData.length, gl.UNSIGNED_SHORT, 0);
    }
}