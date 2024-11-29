// script.js
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("container3D").appendChild(renderer.domElement);

// Lights
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 10);

// Global variables
let object;
const loader = new GLTFLoader();
const loadingText = document.getElementById("loadingText");

// Load model function
function loadModel() {
  // Show loading indicator
  loadingText.style.display = "block";
  loadingText.textContent = "Loading...";

  loader.load(
    "models/scene.gltf", // Path to the model
    (gltf) => {
      object = gltf.scene;
      scene.add(object);
      loadingText.style.display = "none";
    },
    (xhr) => {
      loadingText.textContent = `Loading: ${Math.round(
        (xhr.loaded / xhr.total) * 100
      )}%`;
    },
    (error) => {
      console.error(error);
      loadingText.textContent = "Failed to load model!";
    }
  );
}

// Event listeners
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (object) {
    object.rotation.y += 0.01; // Slowly rotate the object
  }
  controls.update();
  renderer.render(scene, camera);
}

// Initialize
loadModel();
animate();
