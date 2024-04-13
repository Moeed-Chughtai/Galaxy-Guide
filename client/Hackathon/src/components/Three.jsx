import * as THREE from 'three';

import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import andromeda1080 from '../images/galaxies/andromeda1080.jpg';
import mercuryimg from '../images/planetMeshes/mercury.webp';
import sunimg from '../images/planetMeshes/sun.jpg';
import venusimg from '../images/planetMeshes/venus.jpg';
import earthimg from '../images/planetMeshes/earth.jpg';
import marsimg from '../images/planetMeshes/mars.jpg';
import jupiterimg from '../images/planetMeshes/Jupiter.webp';
import saturnimg from '../images/planetMeshes/saturn.jpg';
import uranusimg from '../images/planetMeshes/uranus.png';
import neptuneimg from '../images/planetMeshes/neptune.jpg';
// import { MarginSharp } from '@mui/icons-material';



function createPlanet(planetName, size, distance, meshImg, scene, textureLoader) {
    const planetGeo = new THREE.SphereGeometry(size, size, size);
    const planetMat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(meshImg),
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    scene.add(planet);

    planet.position.set(distance, 0, 0);
    console.log(planetName + " created" + " at " + planet.position.x + " " + planet.position.y + " " + planet.position.z)

    return planet;
}

function startOrbit(planet, multiplier, distance,  time) {
    planet.position.x = distance * Math.cos(time * multiplier);
    planet.position.z = distance * Math.sin(time * multiplier);
}

function followPlanet(planet, camera) {
    // camera.position.set(planet.position.x + 100, planet.position.y + 100, planet.position.z + 100);
    // camera.lookAt(planet.position);

    shouldFollowEarth = true;

    
}

//pop up imports

import React, { useState } from 'react';
import Popup from './Popup';



function createAlien() {
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
let pivot;
function createOrbitingAlien(planet, camera, scene) {
  
  const alien = createAlien();
  
  pivot = new THREE.Object3D();
  pivot.position.copy(planet.position);
  

  alien.position.set(0, 0,  planet.geometry.parameters.radius); 
  

  pivot.add(alien);
  
 
  scene.add(pivot);
  
  
  // const animate = function () {
  //   requestAnimationFrame(animate);
    

  //   pivot.rotation.y += 0.01;
    
  //   renderer.render(scene, camera);
  // };
  
  
}





    


function MyThree() {
  //pop up stuff
  const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = (planetId) => {
        setSelectedPlanet(planetId); // Set the selected planet
        setShowPopup(!showPopup); // Toggle the popup
    };






  const refContainer = useRef(null);
  let shouldLookAtEarth = false;

  useEffect(() => {
    // === THREE.JS CODE START ===

    


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    
    //3d camera orbit view thing
    const controls = new OrbitControls(camera, refContainer.current); //refContainer.current
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    camera.position.set(100, 100, 1400);
    controls.update();


    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );


    //images loading
    //these are flat background
    const textureLoader = new THREE.TextureLoader();
    // scene.background = textureLoader.load(andromeda2);

    

    const cubeTextureLoader = new THREE.CubeTextureLoader();
    scene.background = cubeTextureLoader.load([
        andromeda1080,
        andromeda1080,
        andromeda1080,
        andromeda1080,
        andromeda1080,
        andromeda1080,
        
    ]);




    //ambient lighting
    const overallLight = new THREE.AmbientLight(0x333333)
    scene.add(overallLight)                                  //could be brighter?
    
    //plane geomreyr
    const planeGeo = new THREE.PlaneGeometry(200, 200);
    const planeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);

    //changes rotation to fit grid
    plane.rotation.x = -0.5 * 3.1415926

    // scene.add(plane);   ////////////////add white flat here

    //grid

    const gridHelper = new THREE.GridHelper(1000, 10);
    scene.add(gridHelper)

    //add mercury
    const mercuryGeo = new THREE.SphereGeometry(10, 10, 10);
    const mercuryMat = new THREE.MeshStandardMaterial({           //
        // color: 0x00ff00,
        map: textureLoader.load(mercuryimg),
    });
    const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
    scene.add(mercury);

    mercury.position.set(200, 0, 0)

    const venus = createPlanet("venus", 20, 400, venusimg, scene, textureLoader);
    const earth = createPlanet("earth", 30, 600, earthimg, scene, textureLoader);
    const mars = createPlanet("mars", 20, 800, marsimg, scene, textureLoader);
    const jupiter = createPlanet("jupiter", 50, 1000, jupiterimg, scene, textureLoader);
    const saturn = createPlanet("saturn", 40, 1200, saturnimg, scene, textureLoader);
    const uranus = createPlanet("uranus", 30, 1400, uranusimg, scene, textureLoader);
    const neptune = createPlanet("neptune", 30, 1600, neptuneimg, scene, textureLoader);

    const alien = createAlien();
    alien.position.set(200, 0, 0); 
    scene.add(alien);

    //add sun
    const sunGeo = new THREE.SphereGeometry(100, 100, 100);
    const sunMat = new THREE.MeshStandardMaterial({
        // color: 0x00ff00,
        // emissive: 0xffffff,   //makes it appear brighter
        map: textureLoader.load(sunimg),
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    //sunlight

    // const sunLight = new THREE.PointLight(0xffffff, 1, 4000)//2nd param is intensity beofre 2, does not seem to be working
    // sunLight.position.set(sun.position.x + 100, sun.position.y + 100, sun.position.z + 100);
    // scene.add(sunLight);

    const sunLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    scene.add(sunLight);


    
    var time = 0
    var time2 = 0

    //tilt start axis so they spin diff
    var pi = 3.1415926
    mercury.rotation.x = 0;
    venus.rotation.x = (177*pi)/180;
    earth.rotation.x = (23*pi)/180;
    mars.rotation.x = (25*pi)/180;
    jupiter.rotation.x = (3*pi)/180;
    saturn.rotation.x = (27*pi)/180;
    uranus.rotation.x = (98*pi)/180;
    neptune.rotation.x = (28*pi)/180;

    var shouldFollowEarth = false
    let earthCameraOffset = new THREE.Vector3(0, 0, 200);
    // let pivot = null;

    var animate = function () {
      requestAnimationFrame(animate);
      time += 0.01;
      startOrbit(mercury, 1, 200, time);
      startOrbit(venus, 0.5, 400, time);
      startOrbit(earth, 0.3, 600, time);
      startOrbit(mars, 0.25, 800, time);
      startOrbit(jupiter, 0.2, 1000, time);
      startOrbit(saturn, 0.1, 1200, time);
      startOrbit(uranus, 0.07, 1400, time);
      startOrbit(neptune, 0.05, 1600, time);

      //spin planets
      // mercury.rotation.y += 0.01;
      venus.rotation.y += 0.01;
      earth.rotation.y += 0.01;
      jupiter.rotation.y += 0.01;
      saturn.rotation.y += 0.01;
      uranus.rotation.y += 0.01;
      neptune.rotation.y += 0.01;

      //for alien orbit
      if (pivot) {
        pivot.rotation.y += 0.5;
        // console.log("pivot rotation" + pivot.rotation.y)

        // planet.position.x = distance * Math.cos(time * multiplier);
        // planet.position.z = distance * Math.sin(time * multiplier);

        pivot.position.copy(earth.position);
        alien.position.set(earth.position.x , earth.position.y, earth.position.z + 2.5*earth.geometry.parameters.radius ); // earth.geometry.parameters.radius
      }


      if (shouldFollowEarth) {
        let newPosition = earth.position.clone().add(earthCameraOffset);
        camera.position.copy(newPosition);
        camera.lookAt(earth.position);
      }
      //update camera dependant on mouse position
      controls.update();
    
      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('keydown', function(event) {
      if (event.key === '1') {
        shouldLookAtEarth = true;

        togglePopup(4);
      }
    });

    setInterval(() => {
      if (shouldLookAtEarth) {
        let direction = new THREE.Vector3().subVectors(earth.position, camera.position);
        direction.normalize();
        direction.multiplyScalar(-200);
    
        let newPosition = earth.position.clone().add(direction);
        newPosition.add(earth.position.clone().normalize().multiplyScalar(300)); // Follow Earth's orbit
    
        camera.position.copy(newPosition);
        camera.lookAt(earth.position);
      }
    }, 20);
    

    const mousePosition = new THREE.Vector2();
    window.addEventListener('mousemove', (event) => {
      mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    );

    const rayCaster = new THREE.Raycaster();

    window.addEventListener('click', () => {
      rayCaster.setFromCamera(mousePosition, camera);
      const intersects = rayCaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object === earth) {
          // shouldFollowEarth = !shouldFollowEarth;

         
          // shouldFollowEarth = true;

          // shouldLookAtEarth = !shouldLookAtEarth;
          shouldLookAtEarth = true;

          togglePopup(4);

          createOrbitingAlien(earth, camera, scene);
        }
      }
    });

  }, []);
  return (
    <div ref={refContainer}>
      <Popup trigger={showPopup} setTrigger={setShowPopup} planet={selectedPlanet} />
    </div>


  );
}

export default MyThree