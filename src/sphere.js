import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols' 

const scene = new THREE.Scene()
const dirLight = new THREE.DirectionalLight()
const [width,height] = [window.innerWidth,window.innerHeight]
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 500)
camera.lookAt(0,0,0)
camera.position.z = 5

// Sphere
const sphereGeometry = new THREE.SphereGeometry(1,25,25)
const sphereMaterial = new THREE.MeshNormalMaterial({wireframe:true})
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

scene.add(sphere)

const canvas = document.querySelector('canvas')
new OrbitControls(camera,canvas)
const renderer = new THREE.WebGLRenderer({canvas:canvas,antialias:true})
renderer.setSize(width,height)

;(function animate(){
    window.requestAnimationFrame(animate)
    renderer.render(scene,camera)
})()