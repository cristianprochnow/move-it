import { useState } from 'react'
import { GitHubDisclaimer } from '../components/GithubDisclaimer'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const [githubNickname, setGithubNickname] = useState('')

  return (
    <div className={styles.homeContainer}>
      <div id={styles.heroImage}>
        <img src="./hero-image.svg" alt="Hero image"/>
      </div>
      <section id={styles.homePresentation}>
        <img src="./logo-full-white.svg" alt="Move.it"/>

        <h1>Bem-vindo</h1>

        <GitHubDisclaimer />

        <div>
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
      </section>
    </div>
  )
}
