import { MongoClient } from 'mongodb';

const url = 'mongodb+srv://corlokesh:Yogirajl8%40@cluster0.pmyninz.mongodb.net/';
const dbName = 'Task_Manager';


const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the database
async function connect() {
  try {
    await client.connect();
    console.log('Connected to database');
  } catch (error) {
    console.error('Connection failed', error);
  }
}

// Function to get the database instance
function getDatabase() {
  return client.db(dbName);
}

// Export the connect function and the getDatabase function
export default { connect, getDatabase, };
