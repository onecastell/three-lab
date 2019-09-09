const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class graph {
    constructor() {
        const xGeometry = new THREE.BoxBufferGeometry(4, .1, .1)
        const yGeometry = new THREE.BoxBufferGeometry(.1, .1, 4)
        const material = new THREE.MeshLambertMaterial({ color: 0xf5f5f5 })
        const xAxis = new THREE.Mesh(xGeometry, material)
        const yAxis = new THREE.Mesh(yGeometry, material)

        xAxis.position.set(6 - .05, .4, 2)
        yAxis.position.set(4, .4, 0 + .05)
        this.group = new THREE.Group()
        this.group.add(xAxis, yAxis)
    }
}
module.exports = {
    graph: graph
}