import { useState } from 'react'
import { useRouter } from 'next/router'
import { FiArrowRight } from 'react-icons/fi'
import axios from 'axios'
import styles from '../styles/components/GitHubUsernameInputGroup.module.css'

export function GitHubUsernameInputGroup() {
  const router = useRouter()
  const [githubNickname, setGithubNickname] = useState('')

  const isGitHubUsernameFilled = (githubNickname !== '') ? true : false

  function handleAuthenticateUser() {
    if (!isGitHubUsernameFilled) return

    signUpUser(githubNickname)

    function signUpUser(githubUsername: string) {
      axios
        .post('/api/signup', { githubUsername })
        .then(({ data }) => console.table(data))
        .catch(error => console.error(error))
    }

    function redirectToApp() {
      router.push('/app')
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
        onClick={handleAuthenticateUser}
      >
        <FiArrowRight size={24} />
      </button>
    </div>
  )
}
