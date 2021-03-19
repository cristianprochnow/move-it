import { Db, MongoClient } from "mongodb"

export async function connectToDatabase(mongoDbURI: string, cachedDatabaseConnection: Db) {
  if (cachedDatabaseConnection) return cachedDatabaseConnection

  const mongoClient = await MongoClient.connect(
    mongoDbURI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )

  const databaseName = getDbNameFromMongoURI(mongoDbURI)

  const database = mongoClient.db(databaseName)

  cachedDatabaseConnection = database

  return database

  function getDbNameFromMongoURI(uri: string) {
    /**
     * it will get only "myFirstDatabase" from url
     * mongodb+srv://<user>:<password>@cluster.code.mongodb.net/myFirstDatabase
     */
    const databaseName = new URL(mongoDbURI).pathname.substr(1)

    return databaseName
  }
}
