import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import TWEEN from '@tweenjs/tween.js'
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x8DE969)
const [width, height] = [window.innerWidth, window.innerHeight]

// Keyboard keypress handler
document.onkeydown = event => {
    // Move camera to direction of arrow key
    switch (event.key) {
        case 'ArrowLeft': moveCamera('left')
            break
        case 'ArrowRight': moveCamera('right')
            break
        case 'ArrowUp': moveCamera('up')
            break
        case 'ArrowDown': moveCamera('down')
            break
    }
}

const globalRotation = Math.PI / 1.5
// Platform
const platformGoemetry = new THREE.PlaneGeometry(25, 8)
const platformMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const platform = new THREE.Mesh(platformGoemetry, platformMaterial)
platform.rotation.x = Math.PI / 2
platform.receiveShadow = true
platform.castShadow = false
scene.add(platform)

// Platform Objects
import { object } from "../objects/platform-object";
scene.add(new object(0, 0, 0))

// LIGHTS
var ambientLight = new THREE.AmbientLight(0x707070);
let dirLightAbove = new THREE.DirectionalLight(0xffffff, .5)
dirLightAbove.castShadow = true
dirLightAbove.position.set(0, 2, 0);
scene.add(dirLightAbove, ambientLight)

// CAMERA
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 500)
camera.lookAt(0, 0, 0)
// camera.position.set(0, Math.PI / .5, 12)
camera.position.set(0, 5, 10)
camera.rotation.set(-Math.PI / 8, 0, 0)
// Camera zoom animation
new TWEEN.Tween(camera.position)
    .to({ x: -1, y: 3, z: 9 }, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .delay(1000)
// .start()

// Camera movement on keypress handler
const moveCamera = direction => {
    //Get current camera x value
    let cameraTo
    switch (direction) {
        case 'left': cameraTo = -5
            break
        case 'right': cameraTo = 5
            break
        case 'up':
            new TWEEN.Tween(camera.position)
                .to({ y: 5, z: 0 }, 550)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
            new TWEEN.Tween(camera.rotation)
                .to({ x: -Math.PI / 2 }, 550)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
            break
        case 'down':
            new TWEEN.Tween(camera.position)
                .to({ y: 5, z: 10 }, 550)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
            new TWEEN.Tween(camera.rotation)
                .to({ x: -Math.PI / 8 }, 550)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start()
            break
    }

    const bounds = 10
    const cX = camera.position.x
    // console.log(cX)
    if (cX + cameraTo <= 10 && cX + cameraTo >= -10) {
        new TWEEN.Tween(camera.position)
            .to({ x: cX + cameraTo }, 500)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
    }
}
// ACTION
const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(width, height)
// Enable Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// new OrbitControls(camera, canvas)

; (function animate() {
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
    TWEEN.update()
})()