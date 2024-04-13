import * as THREE from 'three';

import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===

    


    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement );

    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );


    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    



    const geo = new THREE.SphereGeometry(20, 20, 20);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x00ff00
    });
    const sphere = new THREE.Mesh(geo, mat);
    scene.add(sphere);

    camera.position.z = 50;
    

    renderer.render(scene, camera);
  }, []);
  return (
    <div ref={refContainer}></div>

  );
}

export default MyThree