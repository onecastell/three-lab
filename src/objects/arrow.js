const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class arrow {
    constructor(x, y, z) {
        const color = 0x4285F4

        var shape = new THREE.Shape();
        shape.moveTo(-.25, 0);
        shape.lineTo(0, .1);
        shape.lineTo(.25, 0);
        shape.lineTo(0, .5);


        var extrudeSettings = {
            steps: 1.5,
            depth: .1,
            bevelEnabled: true,
            bevelThickness: .005,
            bevelSize: .03,
            bevelOffset: 0,
            bevelSegments: 10
        };

        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        // const arrowGeometry = new THREE.BoxGeometry(1.3, 1.3, .1, 1)
        geometry.rotateX(-Math.PI / 2)
        geometry.rotateZ(Math.PI )
        // const material = new THREE.MeshNormalMaterial({ wireframe: true })
        const material = new THREE.MeshPhongMaterial({ color: color, side: THREE.DoubleSide })
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x, y, z)
        const group = new THREE.Group()
        group.add(plane)
        this.group = group
        return this.group
    }

    move(obj, to) {
        const [x, y, z] = [...to]
        const tween = new TWEEN.Tween(obj.position)
            .to({ x: x, y: y, z: z }, 3000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .delay(1500)
            .start();
        return tween
    }

}

module.exports = {
    arrow: arrow,
    // moveJet: jet.prototype.move
}