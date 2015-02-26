'use strict';

var mongoose = require('mongoose'),
mongeese;

module.exports = mongeese = {
  // Our list of current connections
  connections: {},

  // Closing an existing connection
  closeConnection: function (name) {
    if (name !== undefined) {
      mongeese.connections[name].base.disconnect();
    } else { throw new Error('Connection name required.'); }
  },

  // Get all current connections
  getAllConnections: function () {
    return mongeese.connections;
  },

  // Getting an already established connection
  getConnection: function (name) {
    if (name !== undefined) {
      return mongeese.connections[name];
    } else { throw new Error('Connection name required.'); }
  },

  // Check for connection existence
  connectionExists: function (name) {
    if (name !== undefined) {
      return mongeese.connections[name] != null;
    } else { throw new Error('Connection name required.'); }
  },

  // Creating and returning a new connection
  createConnection: function (name, uri) {
    if (name !== undefined) {
      mongeese.connections[name] = mongoose.createConnection(uri || 'mongodb://localhost/test');
      return mongeese.connections[name];
    } else { throw new Error('Connection name required.'); }
  },


  // Remove connection from pool
  removeConnection: function (name) {
    if (name !== undefined) {
      if (delete mongeese.connections[name]) {
        return true;
      } else { return false; }
    } else { throw new Error('Connection name required.'); }
  },

  // Close all current connections
  closeAllConnections: function () {
    try {
      for (var connection in mongoose.connections) {
        mongeese.connections[connection].base.disconnect();
      }
      return true;
    } catch (err) { throw new Error('Unable to close connections: ' + err); }
  }
};
