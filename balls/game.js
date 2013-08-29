var lite = require('lite-engine'),

	Position = require('./components/position'),
	Velocity = require('./components/velocity'),
	Moviment = require('./systems/moviment'),

	Collision = require('./components/collision'),
	CollisionManager = require('./systems/collision-manager'),

	Render = require('./components/render'),
	Renderer = require('./systems/renderer'),

	stats = require('./stats');

function loop() {
	game.stats.begin();

	Moviment._processAll();
	CollisionManager._processAll();
	// clear game screen
	lite.ctx.clearRect(0, 0, lite.viewport.width, lite.viewport.height);
	Renderer._processAll();

	game.stats.end();
	window.requestAnimationFrame(loop);
}

game = {
	start: function(canvas, width, height) {
		if (!this.initialized) {
			this.initialized = true;
			
			lite.ctx = canvas.getContext('2d');
			lite.viewport.width = canvas.width = width;
			lite.viewport.height = canvas.height = height;

			addEntity(32);

			game.stats = new stats();
			document.body.appendChild( game.stats.domElement );
			loop();

			document.addEventListener('keydown', function(e) {
				if (e.keyCode === 32) addEntity(random(1,32));
			});
		}
	}
};

function random(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var total = 0;
function addEntity(diameter) {
	var newEntityID = lite.newEntityID(),
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

	console.log(++total);
	return newEntityID;
}

module.exports = game;
