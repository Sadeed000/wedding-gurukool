const { MongoClient } = require('mongodb');

async function checkAdmin() {
  const uri = 'mongodb://localhost:27017/Konark-weddings';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('Konark-weddings');
    const usersCollection = db.collection('users');
    
    const adminUser = await usersCollection.findOne({ email: 'admin@konarkweddings.com' });
    
    if (adminUser) {
      console.log('\n? Admin user found:');
      console.log(JSON.stringify(adminUser, null, 2));
    } else {
      console.log('\n? Admin user NOT found in database');
      console.log('Looking for email: admin@konarkweddings.com');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

checkAdmin();
