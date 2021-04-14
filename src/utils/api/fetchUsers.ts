import { Db } from "mongodb";
import { connectToDatabase } from "../connectToDatabase";

const {MONGODB_URI} = process.env
let dbConnection: Db = null

export async function fetchUsers() {
  dbConnection = await connectToDatabase(MONGODB_URI, dbConnection)
  const appStorage = dbConnection.collection('app')

  try {
    const users: string[] = await appStorage.distinct('gitHubUsername')

    return users
  } catch (error) {
    throw new Error(JSON.stringify({
      path: __dirname,
      description: 'An error ocurred at users\' listing, try again later.',
      error
    }))
  }
}
