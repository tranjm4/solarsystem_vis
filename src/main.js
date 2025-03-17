import "./style.css"

import * as THREE from "three";
import {SSObject, SSRingObject} from "./spheres";
import { threshold } from "three/tsl";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.render(scene, camera);

const PI = 3.14159

// const geometry = new THREE.Sphere(sphereCoords, 10);
const sun = new SSObject("sun", 10, 0xDCBB00, 0, 0, 0);
const mercury = new SSObject("mercury", 5, 0xAA8888, 160, 0, 280);
const venus = new SSObject("venus", 5, 0xAA7722, 400, 0, 580);
const earth = new SSObject("earth", 5, 0x3388AA, 120, 0, 880);
const earth2 = new SSObject("earth", 5.1, 0x33BB88, 120, 0, 880, 8, 8);
const mars = new SSObject("mars", 5, 0xEE9933, 280, 0, 1180);
const asteroid1 = new SSObject("asteroid", 4, 0x664444, 100, 15, 1380, 3, 3);
const asteroid2 = new SSObject("asteroid", 3, 0x446666, 90, 0, 1380, 3, 3);
const asteroid3 = new SSObject("asteroid", 5, 0x666666, 110, 5, 1380, 3, 3);
const jupiter = new SSObject("jupiter", 5, 0xBB8855, 400, 0, 2680);
const saturn = new SSObject("saturn", 5, 0xCBA868, 400, 0, 2980);
const saturnRing = new SSRingObject(6, 15, 0xBBA875, -PI / 2 + 0.25, 0.06, 400, 0, 2980);
const uranus = new SSObject("uranus", 5, 0x4499BB, 200, 0, 3280);
const uranusRing = new SSRingObject(5.5, 8, 0x88A8AA, 0, 0, 200, 0, 3280);
const neptune = new SSObject("neptune", 5, 0x4455BB, 300, 0, 3580);
const neptuneRing = new SSRingObject(6, 8, 0x9999AA, -PI / 2 + 0.25, 0.06, 300, 0, 3580);

scene.add(sun.sphere);
scene.add(mercury.sphere);
scene.add(venus.sphere);
scene.add(earth.sphere);
scene.add(earth2.sphere);
scene.add(mars.sphere);
scene.add(asteroid1.sphere);
scene.add(asteroid2.sphere);
scene.add(asteroid3.sphere);
scene.add(jupiter.sphere);
scene.add(saturn.sphere);
scene.add(saturnRing.ring);
scene.add(uranus.sphere);
scene.add(uranusRing.ring);
scene.add(neptune.sphere);
scene.add(neptuneRing.ring);

const objects = [
  sun,
  sun,
  mercury,
  venus,
  earth,
  mars,
  asteroid1,
  jupiter,
  saturn,
  uranus,
  neptune
]

const thresholds = [
  { progress: 0.0, z: 30, x: 0},
  { progress: 0.1, z: 30, x: 0 },         // 10% scroll (Sun)
  { progress: 0.2, z: 300, x: 160 },      // 20% scroll (Mercury)
  { progress: 0.3, z: 600, x: 400 },      // 30% scroll (Venus)
  { progress: 0.4, z: 900, x: 120 },      // 40% scroll (Earth)
  { progress: 0.5, z: 1200, x: 280 },     // 50% scroll (Mars) include asteroid belt?
  { progress: 0.6, z: 1400, x: 100 },     // 60% scroll (asteroid belt)
  { progress: 0.7, z: 2700, x: 400 },     // 70% scroll (Jupiter)
  { progress: 0.8, z: 3000, x: 400 },     // 80% scroll (Saturn)
  { progress: 0.9, z: 3300, x: 200 },     // 90% scroll (Uranus)
  { progress: 0.95, z: 3600, x: 300 },     // 100% scroll (Neptune)
];

const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
function getScrollProgress() {
  // returns scroll %
  return window.scrollY / totalScrollHeight;
}
let currentSphere = getCurrentSphere();
function getPositionBucket(scrollProgress) {
  // Find the nearest threshold
  for (let i = 0; i < thresholds.length; i++) {
    if (scrollProgress <= thresholds[i].progress) {
      if (currentSphere != objects[i]) {
        hideSphereText();
        currentSphere = objects[i];
      }
      return [thresholds[i].z, thresholds[i].x];
    }
  }
  // If scrollProgress is greater than the last threshold, use the last Z position
  return [thresholds[thresholds.length - 1].z, thresholds[thresholds.length - 1].x];
}

function getPositionBucketIndex(scrollProgress) {
  // Find the nearest threshold
  for (let i = 0; i < thresholds.length; i++) {
    if (scrollProgress <= thresholds[i].progress) {
      return i
    }
  }
  // If scrollProgress is greater than the last threshold, use the last Z position
  return thresholds.length - 1;
}

function animate() {
  requestAnimationFrame( animate );

  sun.sphere.rotation.y += 0.005;
  venus.sphere.rotation.y += 0.005;
  mercury.sphere.rotation.y += 0.005;
  earth.sphere.rotation.y += 0.005;
  mars.sphere.rotation.y += 0.005;
  jupiter.sphere.rotation.y += 0.005;
  saturn.sphere.rotation.y += 0.005;
  uranus.sphere.rotation.y += 0.005;
  neptune.sphere.rotation.y += 0.005;

  asteroid1.sphere.rotation.y += 0.005;
  asteroid1.sphere.rotation.x += 0.002;
  asteroid2.sphere.rotation.y -= 0.005;
  asteroid2.sphere.rotation.x += 0.002;
  asteroid3.sphere.rotation.y += 0.01;
  asteroid3.sphere.rotation.z += 0.008;

  asteroid1.sphere.position.x += 0.02;
  asteroid1.sphere.position.y -= 0.02;
  if (asteroid1.sphere.position.x > 130) {
    asteroid1.sphere.position.x = 70;
    asteroid1.sphere.position.y = 20;
  }
  asteroid2.sphere.position.x += 0.01;
  asteroid1.sphere.position.y += 0.01;
  if (asteroid2.sphere.position.x > 130) {
    asteroid2.sphere.position.x = 70;
    asteroid2.sphere.position.y = 0;
  }
  asteroid3.sphere.position.x += 0.04;
  if (asteroid3.sphere.position.x > 130) {
    asteroid3.sphere.position.x = 70;
  }

  updateCamera();

  renderer.render(scene, camera);
}

let intersecting = false;
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  let intersects;
  if (currentSphere == asteroid1) {
    intersects = raycaster.intersectObjects([asteroid1.sphere, asteroid2.sphere, asteroid3.sphere]);
  }
  else {
    intersects = raycaster.intersectObject(currentSphere.sphere);
  }

  if (intersects.length > 0) {
    intersecting = true;
    document.body.style.cursor = "pointer";
  }
  else {
    intersecting = false;
    document.body.style.cursor = "default";
  }
})

function showSphereText() {
  const element = document.getElementById(currentSphere.name);
  element.classList.remove("hidden");
}
function hideSphereText() {
  const element = document.getElementById(currentSphere.name);
  element.classList.add("hidden");
}

window.addEventListener("click", (e) => {
  if (intersecting === true) {
    showSphereText();
  }
  else {
    hideSphereText();
  }
})

function getCurrentSphere() {
  const scrollProgress = getScrollProgress();
  console.log(scrollProgress);
  const index = getPositionBucketIndex(scrollProgress);
  return objects[index];
}

window.addEventListener("scroll", () => {
  updateCamera();
})

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

let targetScrollY = window.scrollY; // Target scroll position
let currentScrollY = targetScrollY; // Current scroll position (for smooth interpolation)
const scrollSpeed = 0.1; // Speed of smooth scrolling (adjust as needed)

// Smooth scroll function
function smoothScroll() {
  currentScrollY += (targetScrollY - currentScrollY) * scrollSpeed; // Interpolate towards the target
  window.scrollTo(0, currentScrollY); // Update the scroll position
  requestAnimationFrame(smoothScroll); // Continue the animation loop
}

// Start the smooth scroll loop
smoothScroll();

// Update the target scroll position on wheel events
window.addEventListener("wheel", (e) => {
  e.preventDefault();
  targetScrollY += e.deltaY; // Adjust target scroll position based on wheel input
  targetScrollY = Math.max(0, Math.min(targetScrollY, document.documentElement.scrollHeight - window.innerHeight)); // Clamp to valid scroll range
}, {passive: false});


let prevScrollProgress = 0;
function updateCamera() {
  const initialCameraZ = camera.position.z;
  const initialCameraX = camera.position.x;
  const scrollProgress = getScrollProgress();
  const scrollProgressChange = scrollProgress - prevScrollProgress;
  prevScrollProgress = scrollProgress;

  const [bucketZ, bucketX] = getPositionBucket(scrollProgress);

  const currentCameraPosition = new THREE.Vector3(initialCameraX, 0, initialCameraZ);
  const targetZ = bucketZ + scrollProgressChange * 1000;
  const targetX = bucketX + scrollProgressChange * 1000;
  const targetCameraPosition = new THREE.Vector3(targetX, 200, targetZ);

  currentCameraPosition.lerp(targetCameraPosition, 0.03);
  camera.position.copy(currentCameraPosition);
  // camera.lookAt(scene.position);
}

animate()