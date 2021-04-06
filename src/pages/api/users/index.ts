import { VercelRequest, VercelResponse } from "@vercel/node";
import { Db } from "mongodb";
import { connectToDatabase } from "../../../utils/connectToDatabase";

const {MONGODB_URI} = process.env
let cachedDatabaseConnection: Db = null

export default async (request: VercelRequest, response: VercelResponse) => {
  cachedDatabaseConnection = await connectToDatabase(MONGODB_URI, cachedDatabaseConnection)

  const collection = cachedDatabaseConnection.collection('app')

  try {
    const users = await collection.distinct('gitHubUsername')

    return response
      .status(200)
      .json(users)
  } catch (error) {
    return response
      .status(500)
      .json({
        path: __dirname,
        description: 'An error ocurred at users\' listing, try again later.',
        error
      })
  }
}
