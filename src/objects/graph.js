const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class graph {
    constructor() {
        const unitGeometry = new THREE.BoxBufferGeometry(.1, .1, .1)
        const material = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 })
        const duration = 250

        // X axis
        const xGeometry = new THREE.BoxBufferGeometry(4, .1, .1)
        const xAxis = new THREE.Mesh(xGeometry, material)
        xAxis.position.set(6 - .05, .4, 2)
        let xUnits = []

        // Y axis
        const yGeometry = new THREE.BoxBufferGeometry(.1, .1, 4)
        const yAxis = new THREE.Mesh(yGeometry, material)
        yAxis.position.set(4, .4, 0 + .05)
        let yUnits = []

        this.animAxis = repeat => {
            // Triggers axis animation
            let delay = 1000
            const easing = TWEEN.Easing.Quadratic.InOut
            for (let i = 4.5, length = 4.5 + (.5 * 6); i <= length; i += .5) {
                const unit = new THREE.Mesh(unitGeometry, material)
                unit.position.set(i, .4 - .0001, 2 + .0001)

                new TWEEN.Tween(unit.position)
                    .to({ z: unit.position.z + .1 }, duration)
                    .yoyo(true)
                    .delay(delay)
                    .repeatDelay(500)
                    .repeat(repeat)
                    .easing(easing)
                    .start()
                new TWEEN.Tween(unit.scale)
                    .to({ z: 2 }, duration)
                    .yoyo(true)
                    .delay(delay)
                    .repeatDelay(500)
                    .repeat(repeat)
                    .easing(easing)
                    .start()
                xUnits.push(unit)
                delay += 75
            }

            delay = 1000
            for (let i = 1.5, length = -2; i > length; i -= .5) {
                const unit = new THREE.Mesh(unitGeometry, material)
                unit.position.set(4 - 0.0001, .4 - 0.0001, i)
                new TWEEN.Tween(unit.position)
                    .to({ x: unit.position.x - .1 }, duration)
                    .yoyo(true)
                    .delay(delay)
                    .repeatDelay(500)
                    .repeat(repeat)
                    .easing(easing)
                    .start()
                new TWEEN.Tween(unit.scale)
                    .to({ x: 2 }, duration)
                    .yoyo(true)
                    .delay(delay)
                    .repeatDelay(500)
                    .repeat(repeat)
                    .easing(easing)
                    .start()
                yUnits.push(unit)
                delay += 75
            }
        }
        this.animAxis(3);

        this.group = new THREE.Group()
        this.group.add(xAxis, yAxis, ...xUnits, ...yUnits)
    }
}
module.exports = {
    graph: graph
}