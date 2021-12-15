import mongooose from 'mongoose';

const connection = {};

async function connect() {
  if(connection.isConnected) {
    return;
  }
  if(mongooose.connections.length > 0) {
    connection.isConnected = mongooose.connections[0].readyState;
    if(connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongooose.disconnect();
  }
  const db = await mongooose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('connected to mongodb');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {

}