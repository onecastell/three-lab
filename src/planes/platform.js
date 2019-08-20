import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import TWEEN from '@tweenjs/tween.js'
import { Interaction } from 'three.interaction'

const scene = new THREE.Scene()
// scene.background = new THREE.Color(0x8DE969)
const [width, height] = [window.innerWidth, window.innerHeight]

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
camera.rotation.set(-Math.PI / 2, 0, 0)
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
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true })
renderer.setClearColor(0x000000, 0)
renderer.setSize(width, height)

// Enable Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// new OrbitControls(camera, canvas)

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
import { playPauseButton } from "../objects/play-pause-button"
import { prevNextButton } from "../objects/prev-next-button"

// First base
const productBase1 = new productBase(-6, 0, 0)
const interactiveMap = new map()
productBase1.group.add(interactiveMap.group)
scene.add(productBase1.group)

// Second Base
const productBase2 = new productBase(0, 0, 0)
// Disable shadow reception to allow for shadow emulation
productBase2.base.receiveShadow = false
// Prev button
const prevButton = new prevNextButton('prev')
// Next buttton
const nextButton = new prevNextButton('next')

productBase2.group.add(prevButton.group, nextButton.group)

// Play-pause button
const playPause = new playPauseButton()
productBase2.group.add(playPause.group)

const screenCarousel = new screens()
scene.add(productBase2.group, screenCarousel.group)

// Third Base
scene.add(new productBase(6, 0, 0).group)


// Keypress listener
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
// Mouse scroll listener
window.addEventListener('wheel', event => {
    event.wheelDeltaX < 0 || event.wheelDeltaY < 0
        ? moveCamera('right')   //  Move Right
        : moveCamera('left')    // Move Left
})

let touchX = 0
let touchY = 0

let xDelta = 0
let yDelta = 0

// Touch event listeners
window.addEventListener('touchstart', event => {
    touchX = event.touches[0].clientX
    touchY = event.touches[0].clientY
    window.addEventListener('touchmove', event => {
        xDelta = event.changedTouches[0].clientX
        yDelta = event.changedTouches[0].clientY
    })
})

window.addEventListener('touchend', event => {
    // Perform action on greatest delta
    if (touchY - yDelta > touchX - xDelta) {
        if (touchY - yDelta < 0)
            moveCamera('up')
        else if (touchY - yDelta > 0)
            moveCamera('down')
    }
    else {
        if (touchX - xDelta < 0)
            moveCamera('left')
        else if (touchX - xDelta > 0)
            moveCamera('right')
    }

})

// Object Listeners
const interaction = new Interaction(renderer, scene, camera)
// Play-pause button click listener
playPause.group.cursor = 'pointer'
const video = screenCarousel.video
playPause.group.on('click', event => {
    playPause.state === 'play'
        ? (playPause.toPauseButton(), video.play())
        : (playPause.toPlayButton(), video.pause())
})
// Prev-next button click listener
prevButton.group.cursor = 'pointer'
nextButton.group.cursor = 'pointer'
prevButton.group.on('click', event => {
    prevButton.anim()
})
nextButton.group.on('click', event => {
    nextButton.anim()
})

// Trigger animations
// interactiveMap.anim()
screenCarousel.anim()
playPause.toPlayButton()

setTimeout(() => {
    prevButton.anim()
}, 500);
setTimeout(() => {
    nextButton.anim()
}, 800)


    ; (function animate() {
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
        TWEEN.update()
    })()