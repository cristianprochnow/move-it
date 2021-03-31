import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import { Db } from 'mongodb'
import { connectToDatabase } from '../../utils/connectToDatabase'

const { MONGODB_URI } = process.env
let cachedDatabaseConnection: Db = null

export default async (request: VercelRequest, response: VercelResponse) => {
  interface RegisterResponseData {
    gitHubUsername: string
    level: number
    completedChallenges: number
    currentExperience: number
  }

  const { gitHubUsername } = request.body
  const level = 0,
    completedChallenges = 0,
    currentExperience = 0,
    joinedAt = new Date()

  try {
    await axios.get(`https://api.github.com/users/${gitHubUsername}`)
  } catch (error) {
    return response
      .status(404)
      .json({
        error: `${gitHubUsername} was not a valid GitHub username`,
        details: error
      })
  }

  cachedDatabaseConnection = await connectToDatabase(MONGODB_URI, cachedDatabaseConnection)
  const collection = cachedDatabaseConnection.collection('app')

  const existentUser: RegisterResponseData = await collection.findOne({gitHubUsername})

  if (existentUser) return response
    .status(202)
    .json({
      gitHubUsername: existentUser.gitHubUsername,
      level: existentUser.level,
      currentExperience: existentUser.currentExperience,
      completedChallenges: existentUser.completedChallenges
    })

  try {
    await collection.insertOne({
      gitHubUsername,
      level,
      completedChallenges,
      currentExperience,
      joinedAt
    })

    return response
      .status(201)
      .json({
        gitHubUsername,
        level,
        completedChallenges,
        currentExperience
      })
  } catch (error) {
    return response
      .status(500)
      .json({
        error: 'An error ocurred at database registering',
        details: error
      })
  }
}
