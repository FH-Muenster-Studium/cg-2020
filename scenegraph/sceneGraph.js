export default class SceneGraph {

    constructor(rootNode) {
        this.root = rootNode;
        this.logString = "";
    }

    drawTraversal(node) {

        this.logString += "{"

        this.logString += node.draw();

        this.logString += "[";

        const children = node.getChildren();
        for (let c = 0; c < children.length; c++) {

            this.drawTraversal(children[c]);

        }
        this.logString += "]";

        this.logString += "}";
    }

    draw() {

        this.logString = "";

        console.log("Zeichne Szenegraph: ");

        console.log("Bspl: {Knoten,[{Kind,[]}]}");

        this.drawTraversal(this.root);

        console.log(this.logString);
        console.log("Zeichnen des Szenegraphen abgeschlossen.");
    }
}
