import { VercelResponse } from '@vercel/node'
import axios from 'axios'
import { Collection, Db } from 'mongodb'
import { connectToDatabase } from '../../../utils/connectToDatabase'

const {MONGODB_URI} = process.env
let cachedDatabaseConnection: Db = null

export default async (_, response: VercelResponse) => {
  interface UserGitHubData {
    avatar_url: string
    name: string
  }

  cachedDatabaseConnection = await connectToDatabase(
    MONGODB_URI,
    cachedDatabaseConnection
  )

  const appCollection = setUpCollection(
    'app',
    cachedDatabaseConnection
  )
  const usersList = await fetchUsersNamesFromDb(
    'gitHubUsername',
    appCollection
  )
  const theTopTenUsers = selectTheTopTenUsers(usersList)
  const usersGitHubData: Array<UserGitHubData> = []

  try {
    await processArrayForPromisesWorking(theTopTenUsers)

    return response
      .status(200)
      .json(usersGitHubData)
  } catch (error) {
    return response
      .status(500)
      .json({
        path: __dirname,
        description: 'An error ocurred at GitHub data fetching, try again later.',
        error
      })
  }

  async function processArrayForPromisesWorking(usersArray: Array<string>) {
    for (let user of usersArray) {
      const {name, avatar_url}: UserGitHubData = await fetchUserGitHubData(user)

      usersGitHubData.push({
        name,
        avatar_url
      })
    }
  }

  function selectTheTopTenUsers(usersNamesList: Array<string>) {
    const topTenUsers = usersNamesList
      .filter((_, position) => position < 10)

    return topTenUsers
  }

  function setUpCollection(
    collectionName: string,
    connection: Db
  ) {
    const collection = connection.collection(collectionName)

    return collection
  }

  async function fetchUsersNamesFromDb(
    distinctFilter: string,
    collection: Collection
  ) {
    const usersNames: Array<string> = await collection.distinct(distinctFilter)

    return usersNames
  }

  async function fetchUserGitHubData(userName: string) {
    const userGitHubUri = getCustomGitHubUri(userName)
    const userGitHubData = await axios.get(userGitHubUri)

    return userGitHubData.data

    function getCustomGitHubUri(user: string) {
      const customUri = `https://api.github.com/users/${user}`

      return customUri
    }
  }
}
