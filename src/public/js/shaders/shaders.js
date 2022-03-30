'use strict';

import * as THREE from '../../three/three.module.js';
import vertex from './vertex.glsl.js';
import fragment from './fragment.glsl.js';

const canvas = document.querySelector('#canvas');

const init = () => {
	// ? ======= variables =======
	let scene, renderer, camera;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);

	renderer = new THREE.WebGLRenderer({
		canvas,
		antialias: true
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight);
	camera.position.set(0, 0, 0.3);


	// ? ======= texture =======
	let plane, material, texture;

	texture = new THREE.TextureLoader().load('./img/body.jpg');

	material = new THREE.ShaderMaterial({
		uniforms: {
			time: {
				type: 'f',
				value: 0
			},
			waveLength: {
				type: 'f',
				value: 3
			},
			imageAsset: {
				type: 't',
				value: texture
			}
		},
		vertexShader: vertex,
		fragmentShader: fragment
	});
	plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 64, 64), material);
	scene.add(plane);


	// ? ======= resize =======
	const resize = () => {
		window.addEventListener('resize', () => {
			const w = window.innerWidth;
			const h = window.innerHeight;
			renderer.setSize(w, h);
			camera.aspect = w / h;

			camera.updateProjectionMatrix();
		});
	};

	resize();


	// ? ======= render =======
	const render = () => {
		renderer.render(scene, camera);
	};


	// ? ======= animate =======
	let time = 0;

	const animate = () => {
		time += 0.05;
		material.uniforms.time.value = time;

		requestAnimationFrame(animate);
		render();
	};

	animate();
}

init();