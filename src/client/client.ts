import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

/**** Custom Code */

let texturesList = 0;
let totalResponses = 0;
let responseIndex = 0;

let loader = new THREE.TextureLoader();

let texture = new THREE.TextureLoader().load('https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_6.png')

//let randIndex = THREE.Math.randInt(0, texturesList.length - 1);
//let randTexture = loader.load(texturesList[randIndex]);
let circleGeometry = new THREE.CircleGeometry(1, 100);
let meshMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  transparent: true,
  opacity: 1,
});
let circle = new THREE.Mesh(circleGeometry, meshMaterial);

scene.add(circle);


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)



    controls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
