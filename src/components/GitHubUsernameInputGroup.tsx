import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/components/GitHubUsernameInputGroup.module.css'

export function GitHubUsernameInputGroup() {
  const router = useRouter()
  const [githubNickname, setGithubNickname] = useState('')

  const isGitHubUsernameFilled = (githubNickname !== '') ? true : false

  function handleAuthenticateUser() {
    if (!isGitHubUsernameFilled) return

    redirectToApp()

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
        <img src="./icons/arrow-right.svg" alt="Go to next page"/>
      </button>
    </div>
  )
}
