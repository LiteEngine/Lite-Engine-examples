var lite = require('lite-engine'),

	Position = lite.component('Position'),
	Collision = lite.component('Collision'),

	COLOR = "#ccc",
	TWO_PI = Math.PI * 2;

Renderer = lite.system.define('renderer', {
	isRenderer: true,

	config: function() {
		lite.ctx.clearRect(0, 0, lite.viewport.width, lite.viewport.height);
	},

	process: function(eid) {
		var ctx = lite.ctx,
			px = Position.get(eid, 'x') | 0,
			py = Position.get(eid, 'y') | 0,
			radius = Collision.get(eid, 'radius') | 0;

		ctx.save();
		ctx.beginPath();
		ctx.arc(px, py, radius, 0, TWO_PI); // draw a circle
		ctx.fillStyle = COLOR;
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}
}, lite.PRIORITY.LOW, true);

module.exports = Renderer;
