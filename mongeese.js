'use strict';

var mongoose = require('mongoose'),
    mongeese;
    
function getObjectSize (obj) {    
  var size = 0;
    
  for(var key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
    
  return size;
}

module.exports = mongeese = {
  connections: {},
  
  connectionExists: function (name) {
    if (name !== undefined) {
      return mongeese.connections[name] != null;
    } else { throw new Error('Connection name required.'); }
  },
  
  closeAllConnections: function () {
    try {
      for (var connection in mongeese.connections) {
        mongeese.connections[connection].base.disconnect();
      }
    } catch (err) { throw new Error('Unable to close connections: ' + err); }
  },
  
  closeConnection: function (name) {  
    if (name !== undefined) {
      try {
        mongeese.connections[name].base.disconnect();
      } catch (err) { throw new Error('Unable to close connection: ' + err); }
    } else { throw new Error('Connection name required.'); }
  },
  
  createConnection: function (name, uri, options) {
    if (name !== undefined) {
      mongeese.connections[name] = mongoose.createConnection(uri || 'mongodb://localhost/test', options || {});
      return mongeese.connections[name];
    } else { throw new Error('Connection name required.'); }
  },
  
  getAllConnections: function () {
    return mongeese.connections;
  },
  
  getConnection: function (name) {
    if (name !== undefined) {
      return mongeese.connections[name];
    } else { throw new Error('Connection name required.'); }
  },
  
  getConnectionCount: function () {
    return getObjectSize(mongeese.connections);
  },
  
  removeAllConnections: function () {
    try {
      for (var connection in mongeese.connections) {
        delete mongeese.connections[connection];
      }
    } catch (err) { throw new Error('Unable to remove connections: ' + err); }
  },

  removeConnection: function (name) {
    if (name !== undefined) {
      return (delete mongeese.connections[name]) ? true : false;
    } else { throw new Error('Connection name required.'); }
  }
};
