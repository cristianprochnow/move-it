import Head from 'next/head'
import { CookiesAndStorageAdviser } from '../components/CookiesAndStorageAdviser'
import { GitHubDisclaimer } from '../components/GitHubDisclaimer'
import { GitHubUsernameInputGroup } from '../components/GitHubUsernameInputGroup'
import { ToastNotification } from '../components/ToastNotification'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>Início | Move.it</title>
      </Head>

      <CookiesAndStorageAdviser />
      <ToastNotification
        type="information"
        message="Por favor, coloque seu nome"
      />

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
