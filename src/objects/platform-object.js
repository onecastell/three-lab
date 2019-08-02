const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')

class object {
    constructor(position) {
        const color = 0xb5b5b5
        const geometry = new THREE.BoxGeometry(5, 5, .1)
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

    move(obj, to) {
        const [x, y, z] = [...to]
        const tween = new TWEEN.Tween(obj.position)
            .to({ x: x, y: y, z: z }, 3000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .delay(1500)
            .start();
        return tween
    }

}

module.exports = {
    object: object,
}