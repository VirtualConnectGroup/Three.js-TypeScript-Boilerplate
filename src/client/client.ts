import * as THREE from 'three'
import { Material } from 'three'


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)



/**** Custom Code */


let totalResponses = 0;
let responseIndex = 0;

const texturesList = [
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_2.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_3.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_4.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_5.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_6.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_7.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_8.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_9.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_10.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_11.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_12.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_13.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_14.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_15.png",
    "https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_16.png",
  ];

let loader = new THREE.TextureLoader();

let randTexture = new THREE.TextureLoader().load('https://augmentyourworldimages.s3.amazonaws.com/LoveCoupons-G/7GHV-Valentines_Coupons_6.png')



let randIndex = THREE.MathUtils.randInt(0,texturesList.length -1);

const raycasterGroup = new THREE.Group;
let circleGeometry = new THREE.CircleGeometry(1, 100);
let meshMaterial = new THREE.MeshBasicMaterial({
  map: randTexture,
  transparent: true,
  opacity: 1,
});
let circle = new THREE.Mesh(circleGeometry, meshMaterial);

raycasterGroup.add(circle);
scene.add(raycasterGroup);

window.addEventListener("click", raycasterEvent, false);
window.addEventListener("mousemove", onMouseMove, false);

function onMouseMove(event:MouseEvent) {
  // calculate pointer position in normalized device coordinates
  // (-1 to +1) for both components
  const moveMouse = new THREE.Vector2();

  moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  //console.log(moveMouse.x);
  //console.log(moveMouse.y);
}

function raycasterEvent(event:MouseEvent) {
    event.preventDefault;
  
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();
  
  
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //console.log(clickMouse.x);
    //console.log(clickMouse.y);
  
    raycaster.setFromCamera(clickMouse, camera);
  
    const intersects = raycaster.intersectObjects( raycasterGroup.children );
    for ( let i = 0; i < intersects.length; i ++ ) {
       console.log("intersecting"); 
       rotateCards();
    }
    
  }

  
  const rotateCards = function () {
    
     let updateLoader = new THREE.TextureLoader(); 
     setInterval(function(){
     for (var i=0; i<50; i++) {
      console.log(i);
    
      
    let randIndex = THREE.MathUtils.randInt(1,texturesList.length -1);
    //console.log(randIndex);
    meshMaterial.needsUpdate = true;

    updateLoader.load(texturesList[randIndex], function (tex) {
      // Once the texture has loaded
      // Asign it to the material
      meshMaterial.map = tex;
      // Update the next texture to show
      //textureToShow++;
      // Have we got to the end of the textures array
      // if(textureToShow > texturesList.length-1) {
      //  textureToShow = 0;
      // }

    });
  };
  }, 100);

}

  // let startLoop = 0;  
  // var count = 0;
  // var inter = setInterval(startLoop, 100);
  
  // let startLoop = function() {
  //   if (count < 50) {
  //     count += 1;
      
  //       console.log(count, "loops in 5 seconds");
  //       rotateCards();
      
  //   // } else {
  //   //   setInterval(clearInterval(inter), 0);
  //   // }
  //   }
  // }

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)





    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()


