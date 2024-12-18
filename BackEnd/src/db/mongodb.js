import { MongoClient, ObjectId } from 'mongodb';

async function deleteDocuments() {
  const uri = "";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("videotube");
    const collection = database.collection("users");

    const result = await collection.deleteMany({
      _id: {
        $nin: [
          new ObjectId("675d022a977a84dfebaba24e"),
          new ObjectId("675e823ee2d24f573bd07aa7")
        ]
      }
    });

    console.log(`${result.deletedCount} documents deleted`);
  } finally {
    await client.close();
  }
}

deleteDocuments();
