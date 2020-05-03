import {modelViewMatrix} from "./webglstart.js";
import {mat4} from "./gl-matrix/index.js";

class KeyboardDemo {

    constructor() {
        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;
    }

    registerEvents() {
        document.addEventListener('keydown', function (event) {
            Key.keyControl(event);
        });

        var Key = {
            keyboardDemo: this,
            keyControl: function (event) {
                this.keyboardDemo.doSomething(event.keyCode);
            }
        }

    }

    doSomething(code) {
        const r = 0.1;
        //console.log(code);
        switch (code) {
            case 37:
                // left arrow
                this.rotateY = r;
                mat4.rotateY(modelViewMatrix, modelViewMatrix, this.rotateY);
                break;
            case 39:
                // right arrow
                this.rotateY = -r;
                mat4.rotateY(modelViewMatrix, modelViewMatrix, this.rotateY);
                break;
            case 38:
                // up arrow
                this.rotateX = r;
                mat4.rotateX(modelViewMatrix, modelViewMatrix, this.rotateX);
                break;
            case 40:
                // down arrow
                this.rotateX = -r;
                mat4.rotateX(modelViewMatrix, modelViewMatrix, this.rotateX);
                break;
            case 69:
                // e
                this.rotateZ = r;
                mat4.rotateZ(modelViewMatrix, modelViewMatrix, this.rotateZ);
                break;    
            case 81:
                // q
                this.rotateZ = -r;
                mat4.rotateZ(modelViewMatrix, modelViewMatrix, this.rotateZ);
                break;

        }
    }
}

export default new KeyboardDemo();
