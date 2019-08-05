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
        //arrow.position.set(x, y, z - .1)
        
        const baseGeometry = new THREE.CircleGeometry(.36, 64)
        baseGeometry.rotateX(-Math.PI / 2)
        baseGeometry.rotateZ(Math.PI)
        const baseMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true })
        const base = new THREE.Mesh(baseGeometry, baseMaterial)
        base.receiveShadow = true
        base.position.set(x, y - .1, z - .17)

        this.group = new THREE.Group()
        this.group.add(arrow, base)

        // Rotate left with position correction
        new TWEEN.Tween(arrow.rotation)
            .to({ y: Math.PI / 2 }, 550)
            .easing(TWEEN.Easing.Cubic.InOut)
        // .start()
        new TWEEN.Tween(arrow.position)
            .to({ x: base.position.x + .15, z: base.position.z - .01 }, 550)
            .easing(TWEEN.Easing.Cubic.InOut)
        // .start()
    }

    pulsateBase(arrow) {
        const pulsateBase = new TWEEN.Tween(arrow.children[1].material)
            .to({ opacity: .5 }, 550)
            .yoyo(true)
            .easing(TWEEN.Easing.Cubic.InOut)
            .repeat(Infinity)
        return pulsateBase
    }
}

module.exports = {
    arrow: arrow,
}