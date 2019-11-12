const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')
//TODO: Add bloom pass
class forceGraph {
    constructor(x, y, z) {
        const points1 = [
            -0.3, -0.6, -0.6,

            0, 0.6, 0,
            0.3, 0.3, 0.6,
            -0.75, 0, 0.9,

            0.3, 0, -1,
            1, 0.5, 0.5,
            0, 0.9, 1,

            -0.75, 0.4, 0,
            0.65, 0.25, -0.25,
            0.65, -0.1, 1.25,

            1, 0.75, -0.5,
            -0.5, 1, -0.75,
            -0.25, 0.1, 0.5,

            -0.3, -0.6, -0.6,

        ]

        const points2 = [
            -0.75, -0.5, -0.5,

            1, 0, 0,
            -0.5, 0.3, 0,
            0.75, 0, 0.5,

            0, 0, 0.75,
            -0.15, 0.5, -0.55,
            0.5, -0.25, -1,

            1, -0.25, -0.5,
            -0.5, -0.25, 0.5,
            0.5, 0.25, -0.5,

            0.5, -0.25, 1,
            -0.35, 0, -1,
            1, -0.25, 0.65,

            1, 0.35, -0.8,

        ]

        const points3 = [
            0, 0, 0,

            0, 0, 0.5,
            0.5, 0, 0,
            0, 0, -0.5,

            -0.5, 0, 0,
            0, 0, 0,
            -0.5, 0, 0.5,

            0, 0.5, 0,
            0.5, 0, -0.5,
            0, -0.5, 0,

            0.5, 0, 0.5,
            -0.5, 0, -0.5,
            0, -0.5, 0,

            -0.5, 0, 0.5
        ]

        // Lines
        const lineGeometry = new THREE.BufferGeometry()
        lineGeometry.addAttribute(
            'position',
            new THREE.BufferAttribute(
                new Float32Array([...points3]), 3
            )
        )
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 2 })
        const lines = new THREE.Line(lineGeometry, lineMaterial)

        // Shperes
        const sphereGeometry = new THREE.SphereBufferGeometry(0.15, 32, 32)
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })

        // Chunk function
        var chunk = (array, chunkSize) => {
            const result = []
            for (let i = 0, length = array.length; i < length; i += chunkSize) {
                result.push(
                    [array[i],
                    array[i + 1],
                    array[i + 2]])
            }
            return result
        }

        // Initial
        const spheres = chunk(points1, 3).map(([x, y, z]) => {
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            sphere.position.set(x, y, z)
            return sphere
        })

        // Morphs

        const next = chunk(points3, 3)
        const init = chunk(points1, 3)
        
            ; (function timeline() {
                for (let [index, point] of Object.entries(chunk(points2, 3))) {

                    const third = new TWEEN.Tween(spheres[index].position)
                        .to({ x: init[index][0], y: init[index][1], z: init[index][2] }, 1500)
                        .easing(TWEEN.Easing.Exponential.InOut)
                        .onComplete(e => {
                            first.start()
                            console.log(e)
                        })

                    const second = new TWEEN.Tween(spheres[index].position)
                        .to({ x: next[index][0], y: next[index][1], z: next[index][2] }, 1500)
                        .easing(TWEEN.Easing.Exponential.InOut)
                        .chain(third)

                    const first = new TWEEN.Tween(spheres[index].position)
                        .to({ x: point[0], y: point[1], z: point[2] }, 1500)
                        .easing(TWEEN.Easing.Exponential.InOut)
                        .start()
                        .chain(second)
                }
            })()


        this.group = new THREE.Group()
        this.group.add(lines, ...spheres)
        this.group.position.set(x, y, z)
        // Rotate Group 
        new TWEEN.Tween(this.group.rotation)
            .to({ y: 2 * Math.PI }, 15000)
            .repeat(Infinity)
        .start()
    }
}

module.exports = {
    graph: forceGraph
}