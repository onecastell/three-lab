const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class jet {
    constructor(x, y, z) {
        const color = 0x3A86B7
        // TODO: convert to buffer geometry
        const geometry = new THREE.PlaneGeometry(.5, .5, 1, 1)
        geometry.vertices[1].set(.8, .8, 0)
        geometry.vertices[2].set(0.25, .25, 0)
        geometry.rotateX(Math.PI / 2)
        geometry.rotateY(Math.PI / 2)
        // const material = new THREE.MeshNormalMaterial({ wireframe: true })
        const material = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
        const plane = new THREE.Mesh(geometry, material)
        plane.position.set(x, y, z)

        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.addAttribute(
            'position',
            new THREE.BufferAttribute(
                new Float32Array(
                    [
                        x + .35, 0, z - .35,
                        x + .35, y, z - .35
                    ]
                ), 3
            )
        )
        const lineMaterial = new THREE.LineBasicMaterial({ color: color })
        const line = new THREE.Line(lineGeometry, lineMaterial)

        const group = new THREE.Group()
        group.add(plane, line)
        this.group = group
        return this.group
    }

    move(obj, to) {
        const [x, y, z] = [...to]
        const tween = new TWEEN.Tween(obj.position)
            .to({ x: x, y: y, z: z }, 3000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            // .repeat(Infinity)
            .start();
        return tween
    }

}

module.exports = {
    jet: jet,
    moveJet: jet.prototype.move
}