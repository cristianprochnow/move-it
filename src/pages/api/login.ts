import { VercelRequest, VercelResponse } from "@vercel/node";
import { Db } from "mongodb";
import { connectToDatabase } from "../../utils/connectToDatabase";

const { MONGODB_URI } = process.env
let cachedDatabaseConnection: Db = null

export default async (request: VercelRequest, response: VercelResponse) => {
  const { githubUsername } = request.body

  cachedDatabaseConnection = await connectToDatabase(
    MONGODB_URI,
    cachedDatabaseConnection
  )

  const collection = cachedDatabaseConnection.collection('app')

  try {
    const registeredUser = await collection.findOne({ githubUsername })

    if (!registeredUser) throw new Error()

    return response
      .status(200)
      .json(registeredUser)
  } catch (error) {
    return response
      .status(404)
      .json({
        error: 'User was not found',
        details: error
      })
  }
}
