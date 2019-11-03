const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class forceGraph {
    constructor(x, y, z) {
        const points = [
            x, y, z,
            x + -0.3, y + 0.6, z + 0.3,
            x + 0.15, y + 0.3, z + 0.6,
            x + -0.75, y + 0, z + 0.9,
            x + 0.3, y + 0, z + 1.5,
            x + 1, y + 0.5, z + 0.5,
        ]

        // Lines
        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.addAttribute(
            'position',
            new THREE.BufferAttribute(
                new Float32Array([...points]), 3
            )
        )
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 })
        const lines = new THREE.Line(lineGeometry, lineMaterial)

        // Shperes
        const sphereGeometry = new THREE.SphereBufferGeometry(0.15, 32, 32)
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
        const spheres = []
        while (points.length > 0) {
            const [x, y, z] = points.splice(0, 3)
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            sphere.position.set(x, y, z)
            spheres.push(sphere)
        }

        this.group = new THREE.Group()
        this.group.add(lines, ...spheres)
    }
}

module.exports = {
    graph: forceGraph
}