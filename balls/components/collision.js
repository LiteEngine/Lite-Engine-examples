var lite = require('lite-engine');

var Collision = lite.component('collision', function(eid, key, val) {
	if (key === 'collidable') {
    if (val === true) {
			lite.system('collision-manager').add(eid);
		} else {
			lite.system('collision-manager').remove(eid);
		}
	}
});

module.exports = Collision;
