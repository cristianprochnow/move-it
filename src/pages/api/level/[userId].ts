import { VercelRequest, VercelResponse } from "@vercel/node";
import { Db } from "mongodb";
import { connectToDatabase } from "../../../utils/connectToDatabase";

const {MONGODB_URI} = process.env
let cachedDatabaseConnection: Db = null

export default async (request: VercelRequest, response: VercelResponse) => {
  const {userId} = request.query
  const {level} = request.body

  cachedDatabaseConnection = await connectToDatabase(MONGODB_URI, cachedDatabaseConnection)

  const collection = cachedDatabaseConnection.collection('app')

  try {
    await collection.updateOne(
      {userId},
      {$set: {level}}
    )

    return response
      .status(204)
      .send('Level updated successfully!')
  } catch (error) {
    return response
      .status(500)
      .json({
        path: __dirname,
        description: 'An error ocurred at level updating, try again later.',
        error
      })
  }
}
