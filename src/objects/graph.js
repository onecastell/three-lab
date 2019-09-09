const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class graph {
    constructor() {
        const unitGeometry = new THREE.BoxBufferGeometry(.1, .1, .1)
        const xGeometry = new THREE.BoxBufferGeometry(4, .1, .1)
        const yGeometry = new THREE.BoxBufferGeometry(.1, .1, 4)
        const material = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 })
        const xAxis = new THREE.Mesh(xGeometry, material)
        const yAxis = new THREE.Mesh(yGeometry, material)

        xAxis.position.set(6 - .05, .4, 2)
        // Axis lines
        let xUnits = []
        const duration = 550
        let delay = 100
        for (let i = 4.5, length = 4.5 + (.5 * 6); i <= length; i += .5) {
            const unit = new THREE.Mesh(unitGeometry, material)
            unit.position.set(i, .4, 2)

            new TWEEN.Tween(unit.position)
                .to({ z: unit.position.z + .1 }, duration)
                .yoyo(true)
                .delay(delay)
                .repeat(Infinity)
                .easing(TWEEN.Easing.Circular.In)
                .start()
            new TWEEN.Tween(unit.scale)
                .to({ z: 2 }, duration)
                .yoyo(true)
                .delay(delay)
                .repeat(Infinity)
                .easing(TWEEN.Easing.Circular.In)
                .start()
            xUnits.push(unit)
            delay += 10
        }
        delay = 100
        yAxis.position.set(4, .4, 0 + .05)
        let yUnits = []
        for (let i = 1.5, length = -2; i > length; i -= .5) {
            const unit = new THREE.Mesh(unitGeometry, material)
            unit.position.set(4, .4, i)
            new TWEEN.Tween(unit.position)
                .to({ x: unit.position.x - .1 }, duration)
                .yoyo(true)
                .delay(delay)
                .repeat(Infinity)
                .easing(TWEEN.Easing.Circular.In)
                .start()
            new TWEEN.Tween(unit.scale)
                .to({ x: 2 }, duration)
                .yoyo(true)
                .delay(delay)
                .repeat(Infinity)
                .easing(TWEEN.Easing.Circular.In)
                .start()
            yUnits.push(unit)
            delay += 10
        }

        this.group = new THREE.Group()
        this.group.add(xAxis, yAxis, ...xUnits, ...yUnits)
    }
}
module.exports = {
    graph: graph
}