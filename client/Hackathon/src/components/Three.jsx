import * as THREE from 'three';

import '../css/three.css';

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
import astronautDialogues from '../data/astronaut_dialogue.json'

// import * as functions from './threeFunctions'
import { createPlanet, startOrbit, followPlanet, createOrbitingAlien, createAlien} from './threeFunctions';




//pop up imports

import React, { useState } from 'react';
import Popup from './Popup';


let pivot, venus, earth, mars, jupiter, saturn, uranus, neptune, rotation;

import planetsData from './../data/planets_info.json';
import Defend from './Defend';
import './../css/popup_style.css';

// console.log('Rendering component with showDefend:', showDefend);

import Quiz from './Quiz';
import { render } from 'react-dom';

function MyThree({ trigger, setTrigger, planet }) {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleQuizClick = () => {
    console.log('setshow quiz called');
    // setTrigger(false);
    setShowQuiz(true);
};


  //pop up stuff
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const planetData = planetsData.find(item => item.id === planet);
    const [showDefend, setShowDefend] = useState(false);

    console.log('Rendering component with showDefend:', showDefend);

    const togglePopup = (planetId) => {
        setSelectedPlanet(planetId); // Set the selected planet
        setShowPopup(!showPopup); // Toggle the popup
        setDialogue(astronautDialogues.find((dialogue) => dialogue.id === planetId).dialogue);
    };


    const handleClose = () => {
      console.log('handleClose called');
      setTrigger(false);
  };
  
  const handleDefendClick = () => {
      console.log('handleDefendClick called');
      setTrigger(false);
      setShowDefend(true);
  };


  
  const handleDefendClose = () => {
      console.log('handleDefendClose called');
      setShowDefend(false);
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

    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );

    camera.position.set(100, 100, 1000);
    controls.update();


    // use ref as a mount point of the Three.js scene instead of the document.body

    refContainer.current
    refContainer.current.appendChild( renderer.domElement );


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
    const overallLight = new THREE.AmbientLight(0x333333, 2)
    scene.add(overallLight) 

   

    const mercury = createPlanet("mercury", 10, 150, mercuryimg, scene, textureLoader);
    const venus = createPlanet("venus", 20, 300, venusimg, scene, textureLoader);
    const earth = createPlanet("earth", 30, 400, earthimg, scene, textureLoader);
    const mars = createPlanet("mars", 20, 500, marsimg, scene, textureLoader);
    const jupiter = createPlanet("jupiter", 50, 600, jupiterimg, scene, textureLoader);
    const saturn = createPlanet("saturn", 40, 700, saturnimg, scene, textureLoader);
    const uranus = createPlanet("uranus", 30, 800, uranusimg, scene, textureLoader);
    const neptune = createPlanet("neptune", 30, 900, neptuneimg, scene, textureLoader);



    const alien = createAlien();
    alien.position.set(200, 0, 0); 
    scene.add(alien);

    //add sun
    // Load the texture


// Load the texture

let sunMaterial;
let sun;
const loader = new THREE.TextureLoader();
loader.load(sunimg, function(texture) {
  // Create a custom shader material
  sunMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      uTexture: { value: texture }
    },
    vertexShader: `
  uniform float time;
  varying vec2 vUv;

  // Simplex 3D Noise
  // by Stefan Gustavson, Ashima Arts
  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 mod289(vec4 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec4 permute(vec4 x) {
    return mod289(((x*34.0)+1.0)*x);
  }

  vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
  }

  vec3 snoise(vec3 v)  { 
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    //  x0 = x0 - 0. + 0.0 * C 
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod289(i); 
    vec4 p = permute( permute( permute( 
               i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
             + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0/7.0; // N=7
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0*x_ );    // mod(j,N)

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    // Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    float noiseValue = 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    return vec3(noiseValue, noiseValue, noiseValue);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec3 noise = snoise(vec3(pos.x*0.03, pos.y*0.03 + time * 0.5, pos.z*0.03));
    pos += noise * 7.0; // Displace the vertex in all directions        //size
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`,
  fragmentShader: `
    uniform float time;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    void main() {
      // Sample the texture
      vec4 texColor = texture(uTexture, vUv);

      // Set the fragment color to the texture color
      gl_FragColor = texColor;
    }
  `
    
  });

  // Create a sphere geometry for the sun
  const sunGeometry = new THREE.SphereGeometry(100, 1000, 1000);

  // Create a mesh with the geometry and material
  sun = new THREE.Mesh(sunGeometry, sunMaterial);

  // Set the sun's position
  sun.position.set(0, 0, 0);

  // Add the sun to the scene
  scene.add(sun);
  animateSun();

  // Create a point light with color white, intensity 1, and no decay over distance
  const sunLight = new THREE.PointLight(0xffffff, 5, 0, 0);
  // Set the position of the light to the position of the sun
  sunLight.position.set(sun.position.x, sun.position.y, sun.position.z);
  sunLight.castShadow = true;
  sunLight.shadow.camera.far = 2000;
  scene.add(sunLight);
});

function animateSun() {
  // Update the time uniform
  sunMaterial.uniforms.time.value = performance.now() / 1000;

  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animateSun);
}


   

    


    
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
      time += 0.1;
      startOrbit(mercury, 1, 150, time);
      startOrbit(venus, 0.5, 200, time);
      startOrbit(earth, 0.3, 300, time);
      startOrbit(mars, 0.25, 400, time);
      startOrbit(jupiter, 0.2, 500, time);
      startOrbit(saturn, 0.1, 600, time);
      startOrbit(uranus, 0.07, 700, time);
      startOrbit(neptune, 0.05, 800, time);

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
      
        // Increase the camera's y position to move it higher
        camera.position.y += 500;
      
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
        direction.multiplyScalar(-50);
    
        let newPosition = earth.position.clone().add(direction);
        newPosition.add(earth.position.clone().normalize().multiplyScalar(300)); // Follow Earth's orbit
    
        camera.position.copy(newPosition);
        camera.lookAt(earth.position);

        // Increase the camera's y position to move it higher
        camera.position.y += 100;

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
    
          shouldLookAtEarth = true;

          togglePopup(4);

          createOrbitingAlien(earth, camera, scene, pivot);
        }
      }
    });

   
      function handleKeyDown(event) {
        if (event.key === 'd') {
          handleDefendClick();
          // trigger(false);

          const divs = document.querySelectorAll('div');

          divs.forEach(div => {
            if (div.id !== 'root' && div.id !== 'three' && !div.closest('#defend')) {
              div.parentNode.removeChild(div);
            }
    });
  }else if (event.key === 'c') {

    // setShowQuiz(true);
    const divs = document.querySelectorAll('div');

    divs.forEach(div => {
      if (div.id !== 'root' && div.id !== 'three' && !div.closest('#quiz')) {
        div.parentNode.removeChild(div);
      }

      // setShowQuiz(true);
      handleQuizClick();
    });
  }
          // handleDefendClick();
        }
      
    

      
    
      document.addEventListener('keydown', handleKeyDown);
  
    
    


  }, []);
  return (
    <div id = 'three' ref={refContainer}>
      <Popup trigger={showPopup} setTrigger={setShowPopup} planet={selectedPlanet} 
      handleClose={handleClose} 
      handleDefendClick={handleDefendClick} 
      handleDefendClose={handleDefendClose}/>



{trigger && !showDefend && (
                <div className="popup-frame">
                    <button className="close-button" onClick={handleClose}>
                        <span className="X"></span>
                        <span className="Y"></span>
                        <div className="close">Close</div>
                    </button>
                    <div className="popup">
                        <div className='left-container'>
                            <h1 className='planet-title'>{planetData.name}</h1>
                            <h1 className='planet-header'>Information on {planetData.name}</h1>
                            <p className='planet-body'>{planetData.body_paragraph}</p>
                            <button className='defend-button' onClick={handleDefendClick}>Defend</button>
                        </div>
                        <div className='right-container'>
                            <h1 className='planet-header'>{planetData.name} Facts</h1>
                            <ul className='planet-facts'>
                                {planetData.facts.map((fact, index) => (
                                    <li key={index}>• {fact}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {showDefend && (
                <Defend
                    trigger={showDefend}
                    setTrigger={handleDefendClose}
                    planet={planet}
                />
            )} 

{showQuiz && <Quiz />}


            



    </div>


  );
}

export default MyThree
