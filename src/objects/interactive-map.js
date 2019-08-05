const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')
const ARROW = require('../objects/arrow')

class map {
    constructor() {
        // Building object
        const color = 0xbada55
        const buildingGeometry = new THREE.BoxGeometry(.5, .5, .5)
        const buildingMaterial = new THREE.MeshPhongMaterial({ color: color })
        let buildings = []
        // Path clearing indexes
        const path = [
            // Move Up
            { x: -5.336, y: 1.996 },
            { x: -5.336, y: 1.330 },
            { x: -5.336, y: 0.664 },
            // Turn Left
            { x: -6.002, y: 0.664 },
            { x: -6.668, y: 0.664 },
            // Move Up
            { x: -6.668, y: -0.002 },
            { x: -6.668, y: -0.668 },
            { x: -6.668, y: -1.334 },
            // Turn Right
            { x: -6.002, y: -1.334 },
            { x: -5.336, y: -1.334 },
            { x: -4.670, y: -1.334 },
            //Move Up
            { x: -4.670, y: -2.000 },
        ]
        // Checks if x and y map to a path coordinate
        const interectsPath = (x, y) => {
            return !!path.filter((p => p.x == x.toFixed(3) && p.y == y.toFixed(3))).length
        }
        // console.log(interectsPath(-4.004, 1.996))
        for (let xIndex = -8; xIndex < -4; xIndex += .666) {
            // note:center -6
            for (let yIndex = -2; yIndex < 2; yIndex += .666) {
                // console.log(`{x:${xIndex.toFixed(3)}, y:${yIndex.toFixed(3)}},`)
                // console.log('break')
                if (!interectsPath(xIndex, yIndex)) {
                    const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
                    building.rotation.x = Math.PI / 2
                    building.position.set(xIndex, .5, yIndex)
                    building.castShadow = true
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
        const arrow = new ARROW.arrow(path[0].x, .4, path[0].y + .2)

        // Start wayfinding animation
        this.anim = () => {
            // Start base pulsation
            ARROW.arrow.prototype.pulsateBase(arrow.group).start()

            console.log(arrow.group.children[0])

            const thirdUp = new TWEEN.Tween(arrow.group.position)
                .to({ z: -4.05 }, 1000)
            const right = new TWEEN.Tween(arrow.group.position)
                .to({ x: 0.68 }, 1000)
                .chain(thirdUp)
            const secondUp = new TWEEN.Tween(arrow.group.position)
                .to({ z: -3.38 }, 1000)
                .chain(right)
            const left = new TWEEN.Tween(arrow.group.position)
                .to({ x: -path[1].y }, 1000)
                // .chain(secondUp)
            const firstUp = new TWEEN.Tween(arrow.group.position)
                .to({ z: -path[1].y }, 1000)
                .start()
                .chain(left)
        }

        const group = new THREE.Group()
        group.add(...buildings, arrow.group)
        this.group = group
    }
}
module.exports = {
    map: map,
}