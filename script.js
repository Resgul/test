import * as THREE from './lib/three.module.js'
import Player from './player.js';
import InputHandler from './input.js';
// import {drawStatusText} from './utils.js';


window.addEventListener('load', () => {
  loader.remove();
  
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  
  const canvas = document.getElementById('canvas1');
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('skyblue');
  
  const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.01, 100);
  camera.position.set(0, 2, 2);

  const hemisphereLight = new THREE.HemisphereLight('skyblue', 'green', 0.3)

  const light = new THREE.PointLight(0xffffff, 0.5);
  light.position.set(0,25,5);
  light.castShadow = true;
  light.shadow.mapSize.set(4096, 4096)
  light.shadow.camera.near = 1
  light.shadow.camera.far = 50


  const renderer = new THREE.WebGL1Renderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;


  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshStandardMaterial({color: 'cyan'});
  const box = new THREE.Mesh(geometry, material);
  box.castShadow = true;


  const planeG = new THREE.PlaneGeometry(50,50);
  const planeM = new THREE.MeshStandardMaterial();
  const ground = new THREE.Mesh(planeG, planeM); 
  ground.rotation.x = -Math.PI * 0.5;
  ground.position.y = -1;
  ground.receiveShadow = true;

  scene.add(ground)


  camera.lookAt(box.position)

  scene.add(camera, light, hemisphereLight, box);

  
  const player = new Player(sizes.width, sizes.height, box);
  const input = new InputHandler();
  const clock = new THREE.Clock();
  let time = 0;
  let timer = 0;
  const FPS_60 = 0.01666;

  function animate() {

    const elapsedTime = clock.getElapsedTime();
    const dt = elapsedTime - time;
    time = elapsedTime;
    
    
    player.update(input.lastKey);

    //слежение камеры игроком
    camera.lookAt(box.position)
    
    //сохранение камеры за спиной игрока
    camera.position.x = (box.position.x + Math.cos(box.rotation.y) * -3);
    camera.position.z = (box.position.z + Math.sin(-box.rotation.y) * -3);
    camera.position.y = 1.5








    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    //_____ рендер на 60 fps
    if (timer > FPS_60) {
      renderer.render(scene, camera);
      timer = 0;
    } else {
      timer += dt;
    }
    //_____ конец рендра на 60 fps
    requestAnimationFrame(animate);
  }
  animate()
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // const ctx = canvas.getContext('2d');
  
  // function resizeWindow() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }
  // resizeWindow();
  // window.addEventListener('resize', resizeWindow)

  // const player = new Player(canvas.width, canvas.height);
  // const input = new InputHandler();

  // function animate() {
  //   ctx.clearRect(0,0, canvas.width, canvas.height);
  //   player.update(input.lastKey);
  //   player.draw(ctx);
  //   drawStatusText(ctx, input, player);
  //   requestAnimationFrame(animate);
  // }
  // animate()
})