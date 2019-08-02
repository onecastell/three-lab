const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')
class map {
    constructor() {

        // Building object geometry
        const color = 0xbada55
        const geometry = new THREE.BoxGeometry(.5, .5, .5)
        const material = new THREE.MeshPhongMaterial({ color: color })
        // const material = new THREE.MeshBasicMaterial({wireframe:true})
        let buildings = []
        // Path clearing indexes
        const path = [{ x: -4.003999999999998, y: 1.996 }]
        // Checks if x and y map to a path coordinate
        const checkXY = (x, y) => {
            return !!path.filter((p => p.x.toFixed(3) == x && p.y.toFixed(3) == y)).length
        }
        console.log(checkXY(-4.004, 1.996))
        for (let xIndex = -8; xIndex < -4; xIndex += .666) {
            // note:center -6

            for (let yIndex = -2; yIndex < 2; yIndex += .666) {
                // console.log(xIndex,yIndex)
                if (path.includes(yIndex) === false) {
                    const building = new THREE.Mesh(geometry, material)
                    building.rotation.x = Math.PI / 2
                    building.position.set(xIndex, .5, yIndex)
                    building.castShadow = true
                    // building.receiveShadow = true
                    const randTiming = Math.floor(Math.random() * 1500)
                    const randHeight = Math.floor(Math.random() * 5 + 1)

                    new TWEEN.Tween(building.scale)
                        .to({ z: randHeight }, randTiming / 4 + 200)
                        .delay(randTiming)
                        .easing(TWEEN.Easing.Bounce.Out)
                        .start()
                    buildings.push(building)
                }
            }
        }

        const group = new THREE.Group()
        group.add(...buildings)
        this.group = group
        return this.group
    }
}
module.exports = {
    map: map
}