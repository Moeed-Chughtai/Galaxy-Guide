import * as THREE from 'three';

import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import andromeda1080 from '../images/galaxies/andromeda1080.jpg';
import mercuryimg from '../images/planetMeshes/mercury.webp';
import sunimg from '../images/planetMeshes/sun.jpg';
import venusimg from '../images/planetMeshes/venus.jpg';
import earthimg from '../images/planetMeshes/earth.jpg';
import jupiterimg from '../images/planetMeshes/Jupiter.webp';
import saturnimg from '../images/planetMeshes/saturn.jpg';
import uranusimg from '../images/planetMeshes/uranus.png';
import neptuneimg from '../images/planetMeshes/neptune.jpg';

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
    


function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===

    


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    
    //3d camera orbit view thing
    const controls = new OrbitControls(camera, refContainer.current); //refContainer.current
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    camera.position.set(100, 100, 100);
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

    scene.add(plane);

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
    const jupiter = createPlanet("jupiter", 50, 800, jupiterimg, scene, textureLoader);
    const saturn = createPlanet("saturn", 40, 1000, saturnimg, scene, textureLoader);
    createPlanet("uranus", 30, 1200, uranusimg, scene, textureLoader);
    createPlanet("neptune", 30, 1400, neptuneimg, scene, textureLoader);

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

    var animate = function () {
      requestAnimationFrame(animate);
      time += 0.01;
      startOrbit(mercury, 1, 200, time);
      startOrbit(venus, 0.5, 400, time);

    
      //update camera dependant on mouse position
      controls.update();
    
      renderer.render(scene, camera);
    };
    animate();

  }, []);
  return (
    <div ref={refContainer}></div>

  );
}

export default MyThree