class Cube extends Cuboid {
    /*constructor(p) {
        // front
        var v1 = vec3.create();
        vec3.set(v1, -p, p, p); // oben links
        var v2 = vec3.create();
        vec3.set(v2, -p, -p, p); // unten links
        var v3 = vec3.create();
        vec3.set(v3, p, -p, p); // unten rechts
        var v4 = vec3.create();
        vec3.set(v4, p, p, p); // oben rechts

        // back
        var v5 = vec3.create();
        vec3.set(v5, -p, p, -p); // oben links
        var v6 = vec3.create();
        vec3.set(v6, -p, -p, -p); // unten links
        var v7 = vec3.create();
        vec3.set(v7, p, -p, -p); // unten rechts
        var v8 = vec3.create();
        vec3.set(v8, p, p, -p); // oben rechts

        super(v1, v2, v3, v4, v5, v6, v7, v8);
    }*/

    constructor(v1, v2, v3) {
        let ver1 = vec3.create();
        let ver2 = vec3.create();
        let ver3 = vec3.create();
        let ver4 = vec3.create();
        let ver5 = vec3.create();
        let ver6 = vec3.create();
        let ver7 = vec3.create();
        let ver8 = vec3.create();
        let multiply = vec3.create();

        vec3.set(multiply, 1.0, 1.0, 1.0);
        vec3.mul(ver1, v1, multiply);

        vec3.set(multiply, 1.0, 1.0, -1.0);
        vec3.mul(ver2, v2, multiply);

        vec3.set(multiply, 1.0, 1.0, 1.0);
        vec3.mul(ver3, v3, multiply);

        vec3.set(multiply, 1.0, -1.0, 1.0);
        vec3.mul(ver4, v3, multiply);

        vec3.set(multiply, 1.0, 1.0, -1.0);
        vec3.mul(ver5, v1, multiply);

        vec3.set(multiply, 1.0, 1.0, 1.0);
        vec3.mul(ver6, v2, multiply);

        vec3.set(multiply, -1.0, 1.0, -1.0);
        vec3.mul(ver7, v1, multiply);

        vec3.set(multiply, 1.0, 1.0, -1.0);
        vec3.mul(ver8, v3, multiply);

        super(ver1, ver2, ver3, ver4, ver5, ver6, ver7, ver8);
    }
}
