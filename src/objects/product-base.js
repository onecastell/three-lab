const THREE = require('three')

class productBase {
    constructor(position) {
        const color = 0xb5b5b5
        const geometry = new THREE.BoxBufferGeometry(5, 5, .1)
        const material = new THREE.MeshPhongMaterial({ color: color })
        const base = new THREE.Mesh(geometry, material)
        base.rotation.x = Math.PI / 2
        base.position.set(position, .2, 0)
        base.castShadow = true
        base.receiveShadow = true
        const group = new THREE.Group()
        group.add(base)
        this.group = group
        return this.group
    }
}

module.exports = {
    productBase: productBase,
}