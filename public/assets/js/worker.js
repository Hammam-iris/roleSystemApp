"use strict";

importScripts('../js/lib/three/three.min.js', '../js/lib/three/loaders/STLLoader.js');

const stlLoader = new THREE.STLLoader();


self.addEventListener('message', (e) => {

	//self.postMessage(true);
	// console.log("From worker", e.data);

	stlLoader.load("../"+e.data.path, ( geometry ) => {

		// geometry.computeFaceNormals();
	    // geometry.computeBoundingBox();
	    let message = {};

	    message.name = e.data.path;
	    message.stepIdx = e.data.stepIdx;

		message.status = 'complete';

		// console.log("From loader", e.data.path, geometry);

	    if (e.data.path.indexOf("Jaw") === -1)
			message.toothIdx = e.data.toothIdx;
		

		if (e.data.path.indexOf("Jaw") !== -1 || e.data.path.indexOf("Original") !== -1){

			message.vertices = geometry.attributes.position.array;
		    message.normals = geometry.attributes.normal.array;
			self.postMessage(message, [message.vertices.buffer, message.normals.buffer]);
		}
		else{
			
			self.postMessage(message);
		}

		self.postMessage(false);
	});

}, false);