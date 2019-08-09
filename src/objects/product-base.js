const THREE = require('three')

class productBase {
    constructor(position) {
        const color = 0xb5b5b5
        const geometry = new THREE.BoxBufferGeometry(5, 5, .1)
        const material = new THREE.MeshPhongMaterial({ color: color })
        this.base = new THREE.Mesh(geometry, material)
        this.base.rotation.x = Math.PI / 2
        this.base.position.set(position, .2, 0)
        this.base.castShadow = true
        this.base.receiveShadow = true
        const group = new THREE.Group()
        group.add(this.base)
        this.group = group
    }
}

module.exports = {
    productBase: productBase,
}