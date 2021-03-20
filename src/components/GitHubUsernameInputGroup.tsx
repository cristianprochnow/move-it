import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiArrowRight } from 'react-icons/fi'
import ReactLoading from 'react-loading'
import axios from 'axios'
import styles from '../styles/components/GitHubUsernameInputGroup.module.css'

export function GitHubUsernameInputGroup() {
  const router = useRouter()
  const [githubNickname, setGithubNickname] = useState('')
  const [isLoading, setLoading] = useState(false)

  const isGitHubUsernameFilled = (githubNickname !== '') ? true : false

  async function handleAuthenticateUser() {
    setLoading(true)

    try {
      const response = await signUp(githubNickname)

      console.log(response)
    } catch (error) {
      console.error(error)
    }

    setLoading(false)

    function redirectToApp() {
      router.push('/app')
    }

    async function signUp(githubUsername: string) {
      return await axios.post('/api/signup', {githubUsername})
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
