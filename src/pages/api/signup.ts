import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'
import { Db } from 'mongodb'
import { connectToDatabase } from '../../utils/connectToDatabase'

const { MONGODB_URI } = process.env
let cachedDatabaseConnection: Db = null

export default async (request: VercelRequest, response: VercelResponse) => {
  interface RegisterResponseData {
    githubUsername: string
    level: number
    completedChallenges: number
    currentExperience: number
  }

  const { githubUsername } = request.body
  const level = 0,
    completedChallenges = 0,
    currentExperience = 0,
    joinedAt = new Date()

  try {
    await axios.get(`https://api.github.com/users/${githubUsername}`)
  } catch (error) {
    return response
      .status(404)
      .json({
        error: `${githubUsername} was not a valid GitHub username`,
        details: error
      })
  }

  cachedDatabaseConnection = await connectToDatabase(MONGODB_URI, cachedDatabaseConnection)
  const collection = cachedDatabaseConnection.collection('app')

  const existentUser: RegisterResponseData = await collection.findOne({githubUsername})

  if (existentUser) return response
    .status(202)
    .json({
      githubUsername: existentUser.githubUsername,
      level: existentUser.level,
      currentExperience: existentUser.currentExperience,
      completedChallenges: existentUser.completedChallenges
    })

  try {
    const registerResponse = await collection.insertOne({
      githubUsername,
      level,
      completedChallenges,
      currentExperience,
      joinedAt
    })

    return response
      .status(201)
      .json({
        githubUsername,
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
