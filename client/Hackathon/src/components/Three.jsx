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



    const geo = new THREE.SphereGeometry(20, 20, 20);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    

    


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