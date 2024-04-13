import * as THREE from 'three';


export function createPlanet(planetName, size, distance, meshImg, scene, textureLoader) {
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

export function startOrbit(planet, multiplier, distance,  time) {
    planet.position.x = distance * Math.cos(time * multiplier);
    planet.position.z = distance * Math.sin(time * multiplier);
}

export function followPlanet(planet, camera) {
    // camera.position.set(planet.position.x + 100, planet.position.y + 100, planet.position.z + 100);
    // camera.lookAt(planet.position);

    shouldFollowEarth = true;

    
}