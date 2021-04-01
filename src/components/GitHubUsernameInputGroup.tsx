import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiArrowRight } from 'react-icons/fi'
import ReactLoading from 'react-loading'
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { COOKIES_NAMES } from '../constants/cookies'
import styles from '../styles/components/GitHubUsernameInputGroup.module.css'

export function GitHubUsernameInputGroup() {
  const router = useRouter()
  const [githubNickname, setGithubNickname] = useState('')
  const [isLoading, setLoading] = useState(false)

  const isGitHubUsernameFilled = (githubNickname !== '') ? true : false

  async function handleAuthenticateUser() {
    interface SignupResponseData {
      userId: string
      gitHubUsername: string
      level: number
      currentExperience: number
      completedChallenges: number
    }

    setLoading(true)

    try {
      const { data } = await signUp(githubNickname)

      setUserDataCookies(data)
    } catch (error) {
      console.error(error)

      alert('😅 Invalid GitHub username.')

      setLoading(false)

      return
    }

    setLoading(false)

    redirectToApp()

    function redirectToApp() {
      router.push('/app')
    }

    async function signUp(gitHubUsername: string): Promise<AxiosResponse<SignupResponseData>> {
      return await axios.post('/api/signup', {gitHubUsername})
    }

    function setUserDataCookies(userData: SignupResponseData) {
      Cookies.set(COOKIES_NAMES.userId, userData.userId)
      Cookies.set(COOKIES_NAMES.gitHubUsername, userData.gitHubUsername)
      Cookies.set(COOKIES_NAMES.level, String(userData.level))
      Cookies.set(COOKIES_NAMES.currentExperience, String(userData.currentExperience))
      Cookies.set(COOKIES_NAMES.completedChallenges, String(userData.completedChallenges))
    }
  }

  return (
    <div className={styles.gitHubUsernameInputGroupContainer}>
      <input
        type="text"
        placeholder="Digite seu username"
        onChange={event => setGithubNickname(event.target.value)}
      />
      <button
        type="button"
        className={
          isGitHubUsernameFilled
            ? styles.filled
            : ''
        }
        disabled={!isGitHubUsernameFilled}
        onClick={handleAuthenticateUser}
      >
        {
          !isLoading
            ? (<FiArrowRight size={24} />)
            : (
              <ReactLoading
                type="bars"
                width={24}
                height={24}
              />
            )
        }
      </button>
    </div>
  )
}
