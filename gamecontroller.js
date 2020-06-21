// https://developer.mozilla.org/en-US/docs/Web/Guide/API/Gamepad
class GameController {

    constructor(node) {
        // Knoten der durch den Controller gesteuert werden soll (z.B. die Kamera)
        this.node = node;
        this.registerEvents();
    }

    registerEvents() {
        window.addEventListener("gamepadconnected", function (e) {
            gp.connecthandler(e.gamepad);
        });
        window.addEventListener("gamepaddisconnected", function (e) {
            gp.disconnecthandler(e.gamepad);
        });

        const gp = {};

        gp.connecthandler = function (gamepad) {
            console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
                gamepad.index, gamepad.id, gamepad.buttons.length, gamepad.axes.length);
            gp.controller = gamepad;
        }
        gp.disconnecthandler = function (gamepad) {
            if (gp.controller.index === gamepad.index) {
                console.log("Gamepad disconnected from index %d: %s", gamepad.index, gamepad.id);
                delete gp.controller;
            }
        }

        this.gp = gp;
    }

    isConnected() {
        return typeof this.gp.controller != "undefined";
    }

    buttonAction(buttonidx) {
        // Beispielcode
        console.log("Button pressed:", buttonidx);

        /**
         Hier Code einfügen
         **/
    }

    axesAction(axes) {
        // Beispielcode zum auslesen der Werte von Stick 3
        if (axes[3].toFixed(3) > 0.1 || axes[3].toFixed(3) < -0.1) {
            console.log("Axis 3:", axes[3].toFixed(3));
        }

        /**
         Hier Code einfügen
         **/
    }

    // updateStatus() wird vor jedem Zeichnen der Szene aufgerufen
    updateStatus() {

        if (!this.isConnected())
            return;

        const controller = this.gp.controller;

        for (let i = 0; i < controller.buttons.length; i++) {
            let val = controller.buttons[i];
            let pressed = val === 1.0;
            if (typeof (val) == "object") {
                pressed = val.pressed;
                val = val.value;
            }

            if (pressed) {
                this.buttonAction(i);
            }
        }

        this.axesAction(controller.axes);
    }
}
