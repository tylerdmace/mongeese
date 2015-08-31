# mongeese
A connection manager for Mongoose

## Installation
The easiest way mongeese is through `npm`:

```Bash
$ npm i mongeese
```

## API

### mongeese#connectionExists(name)
Checks for existing connection object.

#### Parameters
* name &lt;String&gt;

#### Returns
* &lt;Bool&gt;

### mongeese#closeAllConnections()
Closes all connections.

#### Notes
Does not remove the connections from the pool; simply performs a disconnect() on the connection objects.

### mongeese#closeConnection(name)
Closes a single connection.

#### Parameters
* name &lt;String&gt;

### mongeese#createConnection(name)
Creates a new connection.

#### Parameters
* name &lt;String&gt;

#### Returns
* &lt;Mongoose&gt; this

### mongeese#getAllConnections()
Gets all connection objects.

#### Returns
* &lt;Object&gt; connection pool

### mongeese#getConnection(name)
Gets a single connection.

#### Parameters
* name &lt;String&gt;

#### Returns
* &lt;Mongoose&gt; this

### mongeese#getConnectionCount()
Gets a count of all existing connections.

#### Returns
* &lt;Number&gt;

### mongeese#removeAllConnections()
Removes all connection objects.

#### Notes
Does not close the connections; simply deletes the connection objects from the pool.

### mongeese#removeConnection(name)
Removes a single connection.

#### Parameters
* name &lt;String&gt;

#### Returns
* &lt;Bool&gt;

## Contributing

## Changelog
