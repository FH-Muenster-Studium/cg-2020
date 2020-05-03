import {viewMatrix, scene} from "./webglstart.js";
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
        switch (code) {
            case 37:
                // left arrow
                this.rotateY = r;
                mat4.rotateY(viewMatrix, viewMatrix, this.rotateY);
                break;
            case 39:
                // right arrow
                this.rotateY = -r;
                mat4.rotateY(viewMatrix, viewMatrix, this.rotateY);
                break;
            case 38:
                // up arrow
                this.rotateX = r;
                mat4.rotateX(viewMatrix, viewMatrix, this.rotateX);
                break;
            case 40:
                // down arrow
                this.rotateX = -r;
                mat4.rotateX(viewMatrix, viewMatrix, this.rotateX);
                break;
            case 69:
                // e
                this.rotateZ = r;
                mat4.rotateZ(viewMatrix, viewMatrix, this.rotateZ);
                break;    
            case 81:
                // q
                this.rotateZ = -r;
                mat4.rotateZ(viewMatrix, viewMatrix, this.rotateZ);
                break;
            case 109:
                if(scene.camera.fieldOfView > 0 && scene.camera.fieldOfView <= 180) {
                    scene.camera.fieldOfView -= 1;
                    scene.camera.moveProjection();
                }
                break;
            case 107:
                if(scene.camera.fieldOfView >= 0 && scene.camera.fieldOfView < 180) {
                    scene.camera.fieldOfView += 1;
                    scene.camera.moveProjection();
                }
                break;


        }
    }
}

export default new KeyboardDemo();
