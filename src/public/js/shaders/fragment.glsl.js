'use strict';

const fragmentShader = `
	precision lowp float;

	uniform float time;
	uniform sampler2D imageAsset;
	uniform float hover;
	varying vec2 vUv;

	void main() {
		vec4 img = texture2D(imageAsset, vUv);
		gl_FragColor = img;
	}
`;

export default fragmentShader;