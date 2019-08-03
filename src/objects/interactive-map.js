const THREE = require('three')
const TWEEN = require('@tweenjs/tween.js')
const ARROW = require('../objects/arrow')
class map {
    constructor() {

        // Building object
        const color = 0xbada55
        const buildingGeometry = new THREE.BoxGeometry(.5, .5, .5)
        const buildingMaterial = new THREE.MeshPhongMaterial({ color: color })
        // const buildingMaterial = new THREE.MeshBasicMaterial({ wireframe: true })
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

        // Path object
        const pathGeometry = new THREE.Geometry()
        const pathMaterial = new THREE.LineDashedMaterial({
            color: 0x00ff00, scale: 5,
            dashSize: 1,
            gapSize: .5,
        })
        pathGeometry.vertices.push(
            new THREE.Vector3(-5.336, .55, 1.996),
            new THREE.Vector3(-5.336, .55, 0.664),
        )
        const line = new THREE.Line(pathGeometry, pathMaterial)
        line.computeLineDistances(pathGeometry)
        
        var curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ] );
        
        var points = curve.getPoints( 15 );
        var geometry = new THREE.BoxGeometry(1,1,1).setFromPoints( points );
        
        var material = new THREE.MeshBasicMaterial( { color : 0xff0000 } );
        
        // Create the final object to add to the scene
        var curveObject = new THREE.Mesh( geometry, material );
        curveObject.scale.set(5,5,5)


        const arrow = new ARROW.arrow(-4,4,7)
        // const arrow = new ARROW.arrow(path[0].x,1,path[0].y)
        // console.log(arrow)
        // plane.position.set(path[0].x,1,path[0].y)
        // for(let pos of path){
        //     const {x,y} = pos
        //     console.log(x,y)
        //     new TWEEN.Tween(plane.position)
        //         .to({x:x,z:y},1000)
        //         .delay(delay)
        //         .start()
        //     delay += 1000
        // }
                // const two = new TWEEN.Tween(plane.position)
                // .to({x:path[4].x,z:path[4].y},500)
                // const one = new TWEEN.Tween(plane.position)
                // .to({x:path[2].x,z:path[2].y},1000)
                // // .delay(500)
                // // .start()    
                // .chain(two)


        const group = new THREE.Group()
        group.add(...buildings,arrow)
        this.group = group
        return this.group
    }
}
module.exports = {
    map: map
}