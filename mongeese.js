'use strict';

var mongoose = require('mongoose'),
    mongeese;
    
var connections = {};
    
function getObjectSize (obj) {    
  var size = 0;
    
  for(var key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
    
  return size;
}

module.exports = mongeese = {  
  connectionExists: function (name) {
    if (name !== undefined) {
      return connections[name] != null;
    } else { throw new Error('Connection name required.'); }
  },
  
  closeAllConnections: function () {
    try {
      for (var connection in connections) {
        connections[connection].base.disconnect();
      }
    } catch (err) { throw new Error('Unable to close connections: ' + err); }
  },
  
  closeConnection: function (name) {  
    if (name !== undefined) {
      try {
        connections[name].base.disconnect();
      } catch (err) { throw new Error('Unable to close connection: ' + err); }
    } else { throw new Error('Connection name required.'); }
  },
  
  createConnection: function (name, uri, options) {
    if (name !== undefined) {
      connections[name] = mongoose.createConnection(uri || 'mongodb://localhost/test', options || {});
      return connections[name];
    } else { throw new Error('Connection name required.'); }
  },
  
  getAllConnections: function () {
    return connections;
  },
  
  getConnection: function (name) {
    if (name !== undefined) {
      return connections[name];
    } else { throw new Error('Connection name required.'); }
  },
  
  getConnectionCount: function () {
    return getObjectSize(connections);
  },
  
  removeAllConnections: function () {
    try {
      for (var connection in connections) {
        delete connections[connection];
      }
    } catch (err) { throw new Error('Unable to remove connections: ' + err); }
  },

  removeConnection: function (name) {
    if (name !== undefined) {
      return (delete connections[name]) ? true : false;
    } else { throw new Error('Connection name required.'); }
  }
};
