var lite = require('lite-engine'),

	Position = lite.component('position'),
	Velocity = lite.component('velocity'),
	Moviment = require('./systems/moviment'),

	Collision = lite.component('collision'),
	CollisionManager = require('./systems/collision-manager'),

	Render = lite.component('render'),
	Renderer = require('./systems/renderer');


lite.onstart(function() {
	var canvas = document.getElementById('canvas');

	lite.viewport.init('game', 200, 200);

	lite.ctx = canvas.getContext('2d');
	canvas.width = lite.viewport.width;
	canvas.height = lite.viewport.height;

	addEntity(32);

	document.addEventListener('keydown', function(e) {
		if (e.keyCode === 32) addEntity(random(1,32));
	});
});

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var total = 0;
function addEntity(diameter) {
	var newEntityID = lite.entity.create(),
		px = random(diameter, lite.viewport.width - diameter),
		py = random(diameter, lite.viewport.height - diameter),
		vx = random(1,3),
		vy = random(1,3);

	Position.set(newEntityID, 'x', px);
	Position.set(newEntityID, 'y', py);

	Velocity.set(newEntityID, 'x', vx);
	Velocity.set(newEntityID, 'y', vy);

	Collision.set(newEntityID, 'collidable', true);
	Collision.set(newEntityID, 'radius', diameter/2);
	
	Render.set(newEntityID, 'visible', true);

	Moviment.add(newEntityID);
	Renderer.add(newEntityID);
	CollisionManager.add(newEntityID);

	console.log(++total);
	return newEntityID;
}

lite.start({ fps: 60 });
window.lite = lite;
