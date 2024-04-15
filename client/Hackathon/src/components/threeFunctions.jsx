import * as THREE from 'three';

import venusimg from '../images/planetMeshes/venus.jpg';
import earthimg from '../images/planetMeshes/earth.jpg';
import marsimg from '../images/planetMeshes/mars.jpg';
import jupiterimg from '../images/planetMeshes/Jupiter.webp';
import saturnimg from '../images/planetMeshes/saturn.jpg';
import uranusimg from '../images/planetMeshes/uranus.png';
import neptuneimg from '../images/planetMeshes/neptune.jpg';


export function createPlanet(planetName, size, distance, meshImg, scene, textureLoader) {
    const planetGeo = new THREE.SphereGeometry(size, size, size);
    const planetMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(meshImg),
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    
    planet.position.set(distance, 0, 0);
    console.log(planetName + " created" + " at " + planet.position.x + " " + planet.position.y + " " + planet.position.z)

    planet.castShadow = true;
    planet.receiveShadow = true;
    
    return planet;
}

export function startOrbit(planet, multiplier, distance,  time) {
    planet.position.x = distance * Math.cos(time * multiplier);
    planet.position.z = distance * Math.sin(time * multiplier);
}

export function followPlanet(planet, camera) {
    // camera.position.set(planet.position.x + 100, planet.position.y + 100, planet.position.z + 100);
    // camera.lookAt(planet.position);

    shouldFollowEarth = true;

    
}

export function createOrbitingAlien(planet, camera, scene, pivot) {
  
    const alien = createAlien();
    
    pivot = new THREE.Object3D();
    pivot.position.copy(planet.position);
    
  
    alien.position.set(0, 0,  planet.geometry.parameters.radius); 
    
  
    pivot.add(alien);
    
   
    scene.add(pivot);
  }

export function createAlien() {
// body
const bodyGeometry = new THREE.SphereGeometry(5*5, 32*5, 32*5);
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);

// eyes
const eyeGeometry = new THREE.SphereGeometry(2*5, 32*5, 32*5);
const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
eye1.position.set(3.5*5, 1*5, 4*5); 
const eye2 = eye1.clone();
eye2.position.x = -3.5*5; 

//  eyesone body
body.add(eye1);
body.add(eye2);

// pupils
const pupilGeometry = new THREE.SphereGeometry(1*5, 32*5, 32*5); 
const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const pupil1 = new THREE.Mesh(pupilGeometry, pupilMaterial);
pupil1.position.set(3.5*5, 1*5, 6*5); 
const pupil2 = pupil1.clone();
pupil2.position.x = -3.5*5; 

// pupils on body
body.add(pupil1);
body.add(pupil2);

return body;
}

// export function addAllPlanets(scene, textureLoader){
//     const venus = createPlanet("venus", 20, 400, venusimg, scene, textureLoader);
//     const earth = createPlanet("earth", 30, 600, earthimg, scene, textureLoader);
//     const mars = createPlanet("mars", 20, 800, marsimg, scene, textureLoader);
//     const jupiter = createPlanet("jupiter", 50, 1000, jupiterimg, scene, textureLoader);
//     const saturn = createPlanet("saturn", 40, 1200, saturnimg, scene, textureLoader);
//     const uranus = createPlanet("uranus", 30, 1400, uranusimg, scene, textureLoader);
//     const neptune = createPlanet("neptune", 30, 1600, neptuneimg, scene, textureLoader);
// }