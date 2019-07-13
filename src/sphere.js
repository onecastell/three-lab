import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import * as TWEEN from '@tweenjs/tween.js'

const scene = new THREE.Scene()
const dirLight = new THREE.DirectionalLight()
const [width, height] = [window.innerWidth, window.innerHeight]
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500)
camera.lookAt(0, 0, 0)
camera.position.z = 5


const canvas = document.querySelector('canvas')
new OrbitControls(camera, canvas)
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(width, height)

var thetaStart = 0

    ; (function animate() {
        thetaStart += .015
        if(thetaStart>=2*Math.PI)
            thetaStart = 0
        // New Sphere per frame since params not mutable after init
        const sphereGeometry = new THREE.SphereGeometry(1, 25, 25, 0, 2 * Math.PI,thetaStart )
        const sphereMaterial = new THREE.MeshNormalMaterial({ wireframe: true })
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
        sphere.rotation.x = Math.PI/1.55
        sphere.rotation.y = .4
        sphere.rotation.z = .35
        scene.remove(scene.children[0]); 
        scene.add(sphere)

        window.requestAnimationFrame(animate)
        renderer.render(scene, camera)
        TWEEN.update()

    })()