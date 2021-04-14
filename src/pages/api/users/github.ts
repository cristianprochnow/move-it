import { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async (request: VercelRequest, response: VercelResponse) => {
  interface UserGitHubData {
    avatar_url: string
    name: string
  }

  const usersGitHubData: Array<UserGitHubData> = []
  /**
   * 'usersNames' is an array in string format
   * so it will receive 'first users, second user, third user'
   * and must turn it into ['first users', 'second user', 'third user']
   */
  const {usersNames} = request.body
  const usersList = turnUsersStringIntoArray(usersNames)
  const theTopTenUsers = selectTheTopTenUsers(usersList)

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

  function turnUsersStringIntoArray(userNames: string) {
    const usersArray = userNames
      .split(',')
      .map(userName => userName.trim())

    return usersArray
  }

  function selectTheTopTenUsers(usersNamesList: Array<string>) {
    const topTenUsers = usersNamesList
      .filter((_, position) => position < 10)

    return topTenUsers
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
