var lite = require('lite-engine'),
  Position = lite.component('position'),
  Velocity = lite.component('velocity'),
  Collision = lite.component('collision');

var CollisionManager = lite.system.define('collision-manager', {
  priority: lite.PRIORITY.NORMAL,

  process: function (eid) {
    var px = Position.get(eid, 'x'),
      py = Position.get(eid, 'y'),
      vx = Velocity.get(eid, 'x'),
      vy = Velocity.get(eid, 'y'),
      radius = Collision.get(eid, 'radius'),
      
      collided = false;

    // Check for collision with the screen edge (left and right)
    if (px + radius >= lite.viewport.width) {
      collided = true;
      px = lite.viewport.width - radius;
    } else if (px - radius < 0) {
      collided = true;
      px = radius;
    }

    // Update position and velocity if there was a collision
    if (collided) {
      Position.set(eid, 'x', px, false);
      vx *= -1;
      Velocity.set(eid, 'x', vx, false);
      collided = false;
    }

    // Check for collision with the screen edge (top and bottom)  
    if (py + radius > lite.viewport.height) {
      collided = true;
      py = lite.viewport.height - radius;
    } else if (py - radius < 0) {
      collided = true;
      py = radius;
    }

    // Update position and velocity if there was a collision
    if (collided) {
      Position.set(eid, 'y', py, false);
      vy *= -1;
      Velocity.set(eid, 'y', vy, false);
    }
  }
});

module.exports = CollisionManager;
