const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class arrow {
    constructor(x, y, z) {
        const arrowShape = new THREE.Shape();
        arrowShape.moveTo(-.2, 0);
        arrowShape.lineTo(0, .1);
        arrowShape.lineTo(.2, 0);
        arrowShape.lineTo(0, .4);

        const arrowExtrudeSettings = {
            steps: 1.5,
            depth: .1,
            bevelEnabled: true,
            bevelThickness: .005,
            bevelSize: .025,
            bevelOffset: 0,
            bevelSegments: 10
        };

        const arrowGeometry = new THREE.ExtrudeGeometry(arrowShape, arrowExtrudeSettings);
        arrowGeometry.rotateX(-Math.PI / 2)
        arrowGeometry.rotateZ(Math.PI)

        const arrowMaterial = new THREE.MeshPhongMaterial({ color: 0x4285F4 })
        const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
        arrow.position.set(x, y, z)

        const baseGeometry = new THREE.CircleGeometry(.36, 64)
        baseGeometry.rotateX(-Math.PI / 2)
        baseGeometry.rotateZ(Math.PI)
        const baseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true })
        baseMaterial.opacity = .75
        const base = new THREE.Mesh(baseGeometry, baseMaterial)

        base.position.set(x, y - .1, z - .17)

        // new TWEEN.Tween(base.material)
        //     .to({ opacity: .5 })
        // .start()

        this.group = new THREE.Group()
        this.group.add(arrow, base)
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
}