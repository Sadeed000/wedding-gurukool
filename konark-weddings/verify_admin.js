const { MongoClient } = require('mongodb');

async function verifyAdmin() {
  const uri = 'mongodb://localhost:27017/Konark-weddings';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('Konark-weddings');
    const usersCollection = db.collection('users');
    
    const adminUser = await usersCollection.findOne({ email: 'admin@konarkweddings.com' });
    
    if (adminUser) {
      console.log('? Admin user found in database:');
      console.log('  Email:', adminUser.email);
      console.log('  Name:', adminUser.name);
      console.log('  Role:', adminUser.role);
      console.log('  Hashed Password:', adminUser.password);
      console.log('  Password hashed:', adminUser.password && adminUser.password.length > 20 ? 'YES' : 'NO');
    } else {
      console.log('? Admin user NOT found');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
  }
}

verifyAdmin();
