const THREE = require('three')

class map {
    constructor() {
        
        // Building object geometry
        const color = 0xbada55
        const geometry = new THREE.BoxGeometry(.5, .5, .5)
        const material = new THREE.MeshPhongMaterial({ color: color })
        // const material = new THREE.MeshBasicMaterial({wireframe:true})
        let buildings = []

        for (let xIndex = -8; xIndex < -4; xIndex += .666) {
            // note:center -6
            for (let yIndex = -2; yIndex < 2; yIndex += .666) {
                const building = new THREE.Mesh(geometry, material)
                building.rotation.x = Math.PI / 2
                building.position.set(xIndex, .5, yIndex)
                building.castShadow = true
                // building.receiveShadow = true
                buildings.push(building)
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