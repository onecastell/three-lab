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
    horizontals.push(new line([-bounds, 0, i], [bounds, 0, i]))
}
for (let i = -bounds; i <= bounds; i++) {
    verticals.push(new line([i, 0, -bounds], [i, 0, bounds]))
}

// Jets
import { jet, moveJet } from '../objects/jet'
const jet1 = new jet(-5, 1, 4)
const jet2 = new jet(-4, 1, 4)
const jet3 = new jet(-4, 1, 5)

moveJet(jet1, [7, 0, -7])
moveJet(jet2, [7, 0, -7])
moveJet(jet3, [7, 0, -7])

scene.add(jet1, jet2, jet3)
scene.add(...horizontals, ...verticals)

// LIGHTS
const lights = []

// CAMERA
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 500)
camera.lookAt(0, 0, 0)
camera.position.set(6.2, Math.PI / .4, 8.5)

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