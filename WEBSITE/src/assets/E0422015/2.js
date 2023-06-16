const canvas = document.getElementById('canvas');
const x1 = document.getElementById('pos1');
const x2 = document.getElementById('pos2');
const v1 = document.getElementById('v1');
const v2 = document.getElementById('v2');
const m1 = document.getElementById('m1');
const m2 = document.getElementById('m2');
const start = document.getElementById('start');
let textBoxes = document.getElementsByClassName('textEntry');

start.onclick = () => {
	if (start.innerHTML == 'Start') {
		initializeScene();
		renderer.start();
		start.innerHTML = 'Stop';
	} else {
		initializeScene();
	}
}

for (let box of textBoxes) {
	box.onfocus = () => box.select();
	box.oninput = () => initializeScene();
}

class Renderer {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.ground = 3 * canvas.height / 4;
		this.renderObjects = [];
		this.pixelsPerMeter = canvas.width / 20;
		this.running = false;
		this.vIsFinal = false;
		this.vFinal = 0;
	}
	
	drawBackground() {
		this.ctx.fillStyle = 'rgb(150, 190, 255)';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = 'rgb(50,50,50)';
		this.ctx.fillRect(0, this.ground, this.canvas.width, canvas.height - this.ground);
	}
	
	drawText(text) {
		this.ctx.fillStyle = 'white';
		this.ctx.font = '20px monospace';
		this.ctx.fillText('Final velocity: ' + text + ' m/s', 10, 20);
	}
	
	drawAllRenderObjects() {
		if (!this.vIsFinal) {
			this.checkCollision();
		} else {
			this.drawText(this.vFinal.toFixed(2));
		}
		for (let object of this.renderObjects) {
			object.updatePosition();
			let [x, dim, color] = object.getDrawData();
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x * this.pixelsPerMeter, 
						 this.ground - dim * this.pixelsPerMeter,
						 dim * this.pixelsPerMeter,
						 dim * this.pixelsPerMeter);
		}
	}
	
	checkCollision() {
		let left = this.renderObjects[0];
		let right = this.renderObjects[1];
		let [lx, lw, lh] = left.getDrawData();
		let [rx, rw, rh] = right.getDrawData();
		let collision = lx + lw > rx;
		if (collision) {
			let sumMass = left.getMass() + right.getMass();
			let sumVelocity = (left.getMomentum() + right.getMomentum())/sumMass;
			left.setVelocity(sumVelocity);
			right.setVelocity(sumVelocity);
			right.setPosition(lx + lw);
			this.vIsFinal = true;
			this.vFinal = sumVelocity;
		}
	}
	
	addToScene(object) {
		this.renderObjects.push(object);
	}
	
	start() {
		this.running = true;
		requestAnimationFrame(render);
	}
	
	stop() {
		this.running = false;
	}
	
	isRunning() {
		return this.running;
	}
}

class Timer {
	constructor() {
		this.previousTime = undefined;
		this.time = undefined;
		this.delta = undefined;
	}
	
	update(time) {
		if (this.previousTime === undefined) {
			this.previousTime = time/1000;
		}
		this.time = time/1000;
		this.delta = this.time - this.previousTime;
		this.previousTime = this.time;
	}
	
	deltaTime() {
		return this.delta;
	}
}

class RenderObject {
	constructor(xInput, mInput, vInput, color) {
		this.x = +xInput.value;
		this.m = +mInput.value;
		this.dim = this.m / 25;
		this.v = +vInput.value;
		this.color = color;
	}
	
	updatePosition() {
		if (!renderer.isRunning()) {
			return;
		}
		this.x += this.v * timer.deltaTime();
	}
	
	getDrawData() {
		return [this.x, this.dim, this.color];
	}
	
	getMass() {
		return this.m;
	}
	
	getMomentum() {
		return this.m * this.v;
	}
	
	setVelocity(v) {
		this.v = v;
	}
	
	setPosition(x) {
		this.x = x;
	}
}

const render = (time) => {
	timer.update(time);
	renderer.drawBackground();
	renderer.drawAllRenderObjects();
	requestAnimationFrame(render);
}

const initializeScene = () => {
	renderer = new Renderer(canvas);
	timer = new Timer();
	block1 = new RenderObject(x1, m1, v1, 'black');
	block2 = new RenderObject(x2, m2, v2, 'white');
	renderer.addToScene(block1);
	renderer.addToScene(block2);
	renderer.drawBackground();
	renderer.drawAllRenderObjects();
	start.innerHTML = 'Start';
}


// Main
let renderer;
let timer;
let block1;
let block2;
initializeScene();