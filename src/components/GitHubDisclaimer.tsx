import styles from '../styles/components/GitHubDisclaimer.module.css'

export function GitHubDisclaimer() {
  return (
    <span className={styles.gitHubDisclaimerContainer}>
      <img src="./icons/github.svg" alt="Github"/>
      <strong>Faça login com seu Github para começar</strong>
    </span>
  )
}
