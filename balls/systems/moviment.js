var lite = require('lite-engine'),
  Position = lite.component('Position'),
  Velocity = lite.component('Velocity');

var Moviment = lite.system.define('Moviment', {
  priority: lite.PRIORITY.HIGH,

  process: function(eid) {
    var px = Position.get(eid, 'x'),
    py = Position.get(eid, 'y'),
    vx = Velocity.get(eid, 'x'),
    vy = Velocity.get(eid, 'y');

    Position.set(eid, 'x', px + vx);
    Position.set(eid, 'y', py + vy);
  }
});

module.exports = Moviment;
