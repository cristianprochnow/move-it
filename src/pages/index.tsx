import Head from 'next/head'
import { GitHubDisclaimer } from '../components/GithubDisclaimer'
import { GitHubUsernameInputGroup } from '../components/GitHubUsernameInputGroup'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Início | Move.it</title>
      </Head>

      <div id={styles.heroImage}>
        <img src="./hero-image.svg" alt="Hero image"/>
      </div>
      <section id={styles.homePresentation}>
        <img src="./logo-full-white.svg" alt="Move.it"/>

        <h1>Bem-vindo</h1>

        <GitHubDisclaimer />
        <GitHubUsernameInputGroup />
      </section>
    </div>
  )
}
