import * as THREE from 'three';

import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===

    


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    //3d camera orbit view thing
    const controls = new OrbitControls(camera, refContainer.current); //refContainer.current
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    camera.position.set(100, 100, 100);
    controls.update();

    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    //ambient lighting
    const overallLight = new THREE.AmbientLight(0x333333)
    scene.add(overallLight)
    
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

    const gridHelper = new THREE.GridHelper(200, 8);
    scene.add(gridHelper)


    //add sun
    const sunGeo = new THREE.SphereGeometry(20, 20, 20);
    const sunMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00ff00,   //makes it appear brighter
    });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    //sunlight
    const sunLight = new THREE.PointLight(0x00ff00, 2, 100)//2nd param is intensity
    sunLight.position.set(sun.position.x, sun.position.y, sun.position.z);
    scene.add(sunLight);

    


    var animate = function () {
      requestAnimationFrame(animate);
    
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