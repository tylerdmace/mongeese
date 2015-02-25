'use strict';

(function() {
  var mongoose = require('mongoose'),
      mongeese;

  module.exports = mongeese = {
    // Our list of current connections
    connections: {},

    // Closing an existing connection
    closeConnection: function (name) {
      if (name !== undefined) {
        connections[name].disconnect();
      } else { throw new Error('Connection name required.'); }
    },

    // Getting an already established connection
    getConnection: function (name) {
      if (name !== undefined) {
        return connections[name];
      } else { throw new Error('Connection name required.'); }
    },

    // Creating and returning a new connection
    createConnection: function (name, uri) {
      if (name !== undefined) {
        connections[name] = createConnection(uri || 'mongodb://localhost/test');
        return connections[name];
      } else { throw new Error('Connection name required.'); }
    },

    // List all current connections
    listAllConnections: function () {
      return connections;
    },

    // Close all current connections
    closeAllConnections: function () {
      try {
        for (var connection in connections) {
          connections[connection].base.disconnect();
        }
        return true;
      } catch (err) { throw new Error('Unable to close connections: ' + err); }
    }
  };
}).call(this);
