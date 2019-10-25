const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class forceGraph {
    constructor(x, y, z) {
        // Shpere
        const sphereGeometry = new THREE.SphereBufferGeometry(0.15, 32, 32)
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.position.set(x, y, z)

        // Line
        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.addAttribute(
            'position',
            new THREE.BufferAttribute(
                new Float32Array(
                    [
                        x , y, z,
                        x - .35, y+ 1, z + .35
                    ]
                ), 3
            )
        )
        const lines = []
        const sphere2 = new THREE.Mesh(sphereGeometry,sphereMaterial)
        sphere2.position.set(x - .35, y+ 1, z + .35)

        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000,linewidth:2 })
        const line = new THREE.Line(lineGeometry, lineMaterial)

        this.group = new THREE.Group()
        this.group.add(sphere,line,sphere2)
    }
}

module.exports = {
    graph: forceGraph
}