import {viewMatrix, scene} from "./webglstart.js";
import {mat4} from "./gl-matrix/index.js";
import Component from "./scenegraph/component.js";

export default class KeyboardControl extends Component {

    constructor(name) {
        super(name);
        this.rotateX = 0;
        this.rotateY = 0;
        this.rotateZ = 0;

        document.addEventListener('keydown', (event) =>  {
            this.onKeyPress(event.key);
        });
    }

    onKeyPress(code) {
        const r = 0.1;
        switch (code) {
            case "ArrowLeft":
                // left arrow
                this.rotateY = r;
                mat4.rotateY(viewMatrix, viewMatrix, this.rotateY);
                break;
            case "ArrowRight":
                // right arrow
                this.rotateY = -r;
                mat4.rotateY(viewMatrix, viewMatrix, this.rotateY);
                break;
            case "ArrowUp":
                // up arrow
                this.rotateX = r;
                mat4.rotateX(viewMatrix, viewMatrix, this.rotateX);
                break;
            case "ArrowDown":
                // down arrow
                this.rotateX = -r;
                mat4.rotateX(viewMatrix, viewMatrix, this.rotateX);
                break;
            case "e":
                // e
                this.rotateZ = r;
                mat4.rotateZ(viewMatrix, viewMatrix, this.rotateZ);
                break;    
            case "q":
                // q
                this.rotateZ = -r;
                mat4.rotateZ(viewMatrix, viewMatrix, this.rotateZ);
                break;
            case "+":
                if(scene.camera.fieldOfView > 0 && scene.camera.fieldOfView <= 180) {
                    scene.camera.fieldOfView -= 1;
                    scene.camera.moveProjection();
                }
                break;
            case "-":
                if(scene.camera.fieldOfView >= 0 && scene.camera.fieldOfView < 180) {
                    scene.camera.fieldOfView += 1;
                    scene.camera.moveProjection();
                }
                break;
            case "t":
                scene.timeFactor += 1000;
                break;
            case "z":
                scene.timeFactor -= 1000;
                break;
        }
    }
}