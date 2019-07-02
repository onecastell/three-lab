
let canvas = document.getElementById('canvas'); // Canvas
// Scene
let scene = new THREE.Scene();
// Camera
let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.lookAt(0, 0, 0);
camera.position.z = 10;
// Renderer
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight)
// Enable Shadows
renderer.shadowMapEnabled = true;
renderer.shadowMapType = THREE.PCFSoftShadowMap;
// Geometries
const planeGeometry = new THREE.PlaneGeometry(5, 14, 32);
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Lights
let dlight = new THREE.DirectionalLight(0xffffff, 1.5);
dlight.position.set(0, 0, 6);
let sLight = new THREE.SpotLight(0xffffff, 1.5);
sLight.position.set(0, 0, 1);
sLight.position.set(2, 8, 15);
sLight.target.position.set(-2, 0, -2);
sLight.castShadow = true;
sLight.shadowCameraNear = 1;
sLight.shadowCameraFar = 200;
sLight.shadowCameraFov = 45;
sLight.shadowDarkness = 0.5;
sLight.shadowMapWidth = 9000;
sLight.shadowMapHeight = 9000;
// Texture Loader
let loader = new THREE.TextureLoader();
// Load texture and render scene
loader.load(
    'assets/textures/abstract.jpg',
    function (texture) {
        // Materials
        const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        const cubeMaterial = new THREE.MeshPhongMaterial({ map: texture });

        let plane = new THREE.Mesh(planeGeometry, planeMaterial)
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = 5;
        let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.receiveShadow = false;
        cube.position.y = 1.5;
        cube.position.z = 2;
        scene.add(cube, plane, sLight);

        (function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            //Rotate Cube
            cube.rotation.x += .005;
            cube.rotation.y += .005;
        })();
    }
);
