import {gl, shaderProgram} from "./webglstart.js";
import Component from "./scenegraph/component.js";

export default class Texture extends Component {
    constructor(name, src) {
        super(name);
        this.texture = gl.createTexture();

        this.image = new Image();
        this.image.src = src;
        this.image.texture = this.texture;
        this.image.onload = function () {
            Texture.loadTexture(this, this.texture);
            console.log("Texture " + src + " loaded.");
        };
        this.image.onerror = function () {
            console.warn("Could not load texture: " + src);
        };
    }

    static loadTexture(image, texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        //Erlaube alle Größen von Texturen
        //(idealerweise haben Texturen die Seitengröße x^2)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    draw() {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
    }
}