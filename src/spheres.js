import * as THREE from "three";

const PI = 3.14159
export class SSObject {
    constructor(name, radius, color, x=0, y=0, z=10, numMesh1=10, numMesh2=10) {
        this.name = name;
        this.geometry = new THREE.SphereGeometry(
            radius, numMesh1, numMesh2,
            0, PI * 2,
            0, PI
        )
        this.material = new THREE.MeshBasicMaterial( { color: color, wireframe: false } );
        this.sphere = new THREE.Mesh(this.geometry, this.material);
        this.sphere.position.x = x;
        this.sphere.position.y = y;
        this.sphere.position.z = z;
    }
}

export class SSRingObject {
    constructor(innerRadius, outerRadius, color, rotateX, rotateY, x=0, y=0, z=0) {
        this.geometry = new THREE.RingGeometry(
            innerRadius, outerRadius,
            50, 50,
            0, PI * 2
        )
        this.material = new THREE.MeshBasicMaterial( {color: color, wireframe: false } );
        this.ring = new THREE.Mesh(this.geometry, this.material);
        this.ring.position.x = x;
        this.ring.position.y = y;
        this.ring.position.z = z;
        this.ring.rotateX(rotateX);
        this.ring.rotateY(rotateY);
    }
}