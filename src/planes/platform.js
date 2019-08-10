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

// Platform
const platformGoemetry = new THREE.PlaneBufferGeometry(20, 8)
const platformMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
const platform = new THREE.Mesh(platformGoemetry, platformMaterial)
platform.rotation.x = Math.PI / 2
platform.receiveShadow = true
platform.castShadow = false
scene.add(platform)


// Bases and products
import { productBase } from "../objects/product-base";
import { map } from "../objects/interactive-map"
import { screens } from "../objects/screens"
import { button } from "../objects/play-pause-button"

// First base
const productBase1 = new productBase(-6, 0, 0)
const interactiveMap = new map()
productBase1.group.add(interactiveMap.group)
scene.add(productBase1.group)

// Second Base
const productBase2 = new productBase(0, 0, 0)
// Disable shadow reception to allow for shadow emulation
productBase2.base.receiveShadow = false
// Play-pause button
const playPause = new button()
productBase2.group.add(playPause.group)

const screenCarousel = new screens()
scene.add(productBase2.group,screenCarousel.group)

// Third Base
scene.add(new productBase(6, 0, 0).group)

// LIGHTS
const ambientLight = new THREE.AmbientLight(0x707070);
const spotligt = new THREE.SpotLight(0x707070, 1.5)
spotligt.castShadow = true
// spotligt.shadow.camera.near = 1
// spotligt.shadow.camera.far = 200
spotligt.position.set(0, 5, 0)
spotligt.angle = Math.PI / 1.8
spotligt.shadow.mapSize.width = 4096;
spotligt.shadow.mapSize.height = 4096;

scene.add(ambientLight, spotligt)

// CAMERA
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 500)
camera.lookAt(0, 0, 0)
camera.position.set(-6, 6, 10)
camera.rotation.set(-Math.PI / 8, 0, 0)
// let cameraIndex = -6;
let cameraIndex = 0;
// Begin map animation
// interactiveMap.anim()
// Begin screen carousel animation
screenCarousel.anim()

camera.rotation.set(-Math.PI/2,0,0)
// camera.position.set(-1.5,2,3)
camera.position.set(0, 5, 0)

// Camera movement on keypress handler
const moveCamera = direction => {
    let index = cameraIndex
    switch (direction) {
        case 'left': index -= 6
            break
        case 'right': index += 6
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

    if (index <= 10 && index >= -10) {
        new TWEEN.Tween(camera.position)
            .to({ x: index }, 500)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()

        new TWEEN.Tween(spotligt.position)
            .to({ x: index }, 250)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .start()
        cameraIndex = index
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