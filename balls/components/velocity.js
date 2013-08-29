var lite = require('lite-engine');

var Velocity = lite.component('Velocity', function (eid, key, val) {
	if (key === 'x' || key === 'y') {
    if (!this.get(eid, 'in moviment')) {
      this.set(eid, 'in moviment', true);
      lite.system('Moviment').add(eid);
    }
	}
});

module.exports = Velocity;
