var lite = require('lite-engine');

var Moviment = lite.system('Moviment', function (eid) {
  var Position = lite.component('Position'),
    Velocity = lite.component('Velocity'),

    px = Position.get(eid, 'x'),
    py = Position.get(eid, 'y'),
    vx = Velocity.get(eid, 'x'),
    vy = Velocity.get(eid, 'y');

  Position.set(eid, 'x', px + vx);
  Position.set(eid, 'y', py + vy);
}, lite.PRIORITY.HIGH);

module.exports = Moviment;
