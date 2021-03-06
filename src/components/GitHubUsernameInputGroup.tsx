import { useState } from 'react'
import styles from '../styles/components/GitHubUsernameInputGroup.module.css'

export function GitHubUsernameInputGroup() {
  const [githubNickname, setGithubNickname] = useState('')

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
          githubNickname !== ''
            ? styles.filled
            : ''
        }
      >
        <img src="./icons/arrow-right.svg" alt="Go to next page"/>
      </button>
    </div>
  )
}
