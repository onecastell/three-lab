import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import * as TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x00ccff)

const dLight = (x, y, z) => {
    const l = new THREE.DirectionalLight(0xffffff, 0.5)
    l.position.set(x, y, z)
    scene.add(l)
}
dLight(0, 0, 5)
dLight(0, 0, -5)

const [width, height] = [window.innerWidth, window.innerHeight]
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 500)
camera.lookAt(0, 0, 0);

camera.position.z = 25
var positions = new Float32Array([
    -1.0, -1.0, 3.0,
    1.0, -1.0, 3.0,
    1.0, 1.0, 3.0,
    -1.0, 1.0, 3.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
])

const sphereGeometry = new THREE.SphereGeometry(.5, 25, 25, 0, 2 * Math.PI)
var geometry = new THREE.BufferGeometry();
geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
// let material = new THREE.PointsMaterial({ color: 0xa5a5a5, size: .1 });
const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
let point = new THREE.Points(geometry, material);

// Plot points, set tweens and add to scene
for (let i = 0; i < positions.length; i += 3) {
    const dot = new THREE.Mesh(sphereGeometry, material)
    dot.position.set(-10 + i, 0, 0)

    const separate = new TWEEN.Tween(dot.position)
        .to({ y: 1, }, 400)
        .delay((i + 3) * 10)
        .yoyo(true)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .repeat(Infinity)
        .start();

    scene.add(dot)
}

let moveCam = speed => { camera.position.x = -Math.tan(speed) * 5; }

const canvas = document.querySelector('canvas')
new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(width, height)

    ; (function animate() {
        var speed = Date.now() * 0.001;
        moveCam(speed)
        // camera.position.z = -Math.sin(speed) * 5 + 20;
        TWEEN.update()
        window.requestAnimationFrame(animate)
        renderer.render(scene, camera)

    })()