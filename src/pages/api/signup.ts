import { VercelRequest, VercelResponse } from '@vercel/node'
import { Db } from 'mongodb'
import { connectToDatabase } from '../../utils/connectToDatabase'


const { MONGODB_URI } = process.env
let cachedDatabaseConnection: Db = null

export default async (request: VercelRequest, response: VercelResponse) => {
  const { githubUsername } = request.body

  cachedDatabaseConnection = await connectToDatabase(process.env.MONGODB_URI, cachedDatabaseConnection)
  const collection = cachedDatabaseConnection.collection('app')

  try {
    const registerResponse = await collection.insertOne({
      githubUsername,
      joinedAt: new Date()
    })

    return response.status(201).json({ signUpId: registerResponse.insertedId })
  } catch (error) {
    return response.status(500).json({ error })
  }
}
