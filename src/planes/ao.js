import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import TWEEN from '@tweenjs/tween.js'
const scene = new THREE.Scene()
const [width, height] = [window.innerWidth, window.innerHeight]

// PLANE SURFACE

// Individual Line Class
class line {
    constructor(p1, p2) {
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 1 })
        const geometry = new THREE.BufferGeometry()
        const vertices = new Float32Array(p1.concat(p2))
        geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3))

        return new THREE.Line(geometry, material)
    }
}

const bounds = 5 // Specifies grid area where area = (-bounds <= 0 <= bounds) ^ 2
let horizontals = []
let verticals = []

// Generate Grid
for (let i = -bounds; i <= bounds; i++) {
    const xLine = new line([-bounds, 0, i], [bounds, 0, i])
    xLine.scale.set( 0.0001,1,1)
    new TWEEN.Tween(xLine.scale)
    .to({ x:1 },250* Math.abs(i))
    .easing(TWEEN.Easing.Quadratic.In)
    .start()
    horizontals.push(xLine)
}
for (let i = -bounds; i <= bounds; i++) {
    const yLine = new line([i, 0, -bounds], [i, 0, bounds])
    yLine.scale.set( 0.0001,1,1)
    new TWEEN.Tween(yLine.scale)
    .to({ x:1 }, 250 * Math.abs(i))
    .easing(TWEEN.Easing.Quadratic.In)
    .start()
    verticals.push(yLine)
}

// Grid pan animation
const grid = new THREE.Group()

new TWEEN.Tween(grid.rotation)
    .to({ x: Math.PI / 10, y: 2, }, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .delay(2000)
    .start()
new TWEEN.Tween(grid.position)
    .to({ x: 3, z: 6, }, 1000)
    .easing(TWEEN.Easing.Quadratic.In)
    .delay(3000)
    .start()

// Jets
import { jet, moveJet } from '../objects/jet'
const jet1 = new jet(-5, 1, 4)
const jet2 = new jet(-4, 1, 4)
const jet3 = new jet(-4, 1, 5)

moveJet(jet1, [7, 0, -7])
moveJet(jet2, [7, 0, -7])
moveJet(jet3, [7, 0, -7])

grid.add(jet1, jet2, jet3, ...horizontals, ...verticals)
scene.add(grid)

// LIGHTS
const lights = []

// CAMERA
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 500)
camera.lookAt(0, 0, 0)
camera.position.set(0, Math.PI / .5, 12)

// Camera zoom animation
new TWEEN.Tween(camera.position)
    .to({ x: -1, y: 3, z: 9 }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .delay(1000)
    .start()

// ACTION
const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(width, height)

new OrbitControls(camera, canvas)

    ; (function animate() {
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
        TWEEN.update()
    })()