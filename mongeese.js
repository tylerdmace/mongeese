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
        this.connections[name].base.disconnect();
      } else { throw new Error('Connection name required.'); }
    },

    // Getting an already established connection
    getConnection: function (name) {
      if (name !== undefined) {
        return this.connections[name];
      } else { throw new Error('Connection name required.'); }
    },

    // Creating and returning a new connection
    createConnection: function (name, uri) {
      if (name !== undefined) {
        this.connections[name] = mongoose.createConnection(uri || 'mongodb://localhost/test');
        return this.connections[name];
      } else { throw new Error('Connection name required.'); }
    },

    // List all current connections
    listAllConnections: function () {
      return this.connections;
    },

    // Close all current connections
    closeAllConnections: function () {
      try {
        for (var connection in this.connections) {
          this.connections[connection].base.disconnect();
        }
        return true;
      } catch (err) { throw new Error('Unable to close connections: ' + err); }
    }
  };
}).call(this);
