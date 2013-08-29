var lite = require('lite-engine');

var Render = lite.component('Render', function(eid, key, val) {
	if (key === 'visible') {
    if (val === true) {
			lite.system('renderer').add(eid);
		} else {
			lite.system('renderer').remove(eid);
		}
	}
});

module.exports = Render;
