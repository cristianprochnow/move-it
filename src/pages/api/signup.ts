import { VercelRequest, VercelResponse } from '@vercel/node'
import { Db, MongoClient } from 'mongodb'

const { MONGODB_URI } = process.env
let cachedDatabaseConnection: Db = null

async function connectToDatabase(mongoDbURI: string) {
  function getDbNameFromMongoURI(uri: string) {
    /**
     * it will get only "myFirstDatabase" from url
     * mongodb+srv://<user>:<password>@cluster.code.mongodb.net/myFirstDatabase
     */
    const databaseName = new URL(mongoDbURI).pathname.substr(1)

    return databaseName
  }

  if (cachedDatabaseConnection) return cachedDatabaseConnection

  const mongoClient = await MongoClient.connect(
    mongoDbURI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )

  const databaseName = getDbNameFromMongoURI(MONGODB_URI)

  const database = mongoClient.db(databaseName)

  cachedDatabaseConnection = database

  return database
}

export default async (request: VercelRequest, response: VercelResponse) => {
  const { githubUsername } = request.body

  const databaseConnection = await connectToDatabase(process.env.MONGODB_URI)
  const collection = databaseConnection.collection('app')

  try {
    const registerResponse = await collection.insertOne({
      githubUsername,
      joinedAt: new Date()
    })

    return response.status(203).json({ signUpId: registerResponse.insertedId })
  } catch (error) {
    return response.status(500).json({ error })
  }
}
