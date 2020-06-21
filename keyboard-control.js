import {scene} from "./webglstart.js";
import Component from "./scenegraph/component.js";

export default class KeyboardControl extends Component {

    constructor(name) {
        super(name);
        this.downKeys = new Set();
        document.addEventListener('keydown', (event) =>  {
            this.onKeyPress(event.key);
            this.downKeys.add(event.key);
        });
        document.addEventListener('keyup', (event) =>  {
            this.downKeys.delete(event.key);
        });
    }

    onKeyPress(code) {
        switch (code) {
            case "w":
                //scene.camera.forward();
                break;
            case "a":
                scene.camera.left();
                break;
            case "s":
                scene.camera.backward();
                break;
            case "d":
                scene.camera.right();
                break;
            /*case "ArrowUp":
                scene.camera.lookUp();
                break;
            case "ArrowDown":
                scene.camera.lookDown();
                break;
            case "ArrowLeft":
                scene.camera.lookLeft();
                break;
            case "ArrowRight":
                scene.camera.lookRight();
                break;*/
        }
    }

    draw(now) {
        if (this.downKeys.has("w")) {
            scene.camera.forward(0.01);
        }
        if (this.downKeys.has("ArrowUp")) {
            scene.camera.lookUp();
        }
        if (this.downKeys.has("ArrowDown")) {
            scene.camera.lookDown();
        }
        if (this.downKeys.has("ArrowLeft")) {
            scene.camera.lookLeft();
        }
        if (this.downKeys.has("ArrowRight")) {
            scene.camera.lookRight();
        }
        return super.draw(now);
    }
}