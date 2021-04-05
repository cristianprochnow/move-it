import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { CookiesAndStorageAdviser } from '../components/CookiesAndStorageAdviser'
import { GitHubDisclaimer } from '../components/GitHubDisclaimer'
import { ToastNotification, ToastNotificationProps } from '../components/ToastNotification'
import { COOKIES_NAMES } from '../constants/cookies'
import ReactLoading from 'react-loading'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const router = useRouter()
  const [githubNickname, setGithubNickname] = useState('')
  const [isLoading, setLoading] = useState(false)
  const isGitHubUsernameFilled = (githubNickname !== '') ? true : false
  const [notifications, setNotifications] = useState([] as Array<ToastNotificationProps>)

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

      setNotifications([...notifications, {
        type: 'success',
        message: 'Registro realizado com sucesso'
      }])
      setUserDataCookies(data)
    } catch (error) {
      setNotifications([...notifications, {
        type: 'error',
        message: 'Username do GitHub inválida'
      }])

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
    <div className={styles.homeContainer}>
      <Head>
        <title>Início | Move.it</title>
      </Head>

      <CookiesAndStorageAdviser />

      {
        notifications.map((
          {message, type},
          position
          ) => (
          <ToastNotification
            key={position}
            type={type}
            message={message}
          />
        ))
      }

      <div id={styles.heroImage}>
        <img src="./hero-image.svg" alt="Hero image"/>
      </div>
      <section id={styles.homePresentation}>
        <img src="./logo-full-white.svg" alt="Move.it"/>

        <h1>Bem-vindo</h1>

        <GitHubDisclaimer />

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
      </section>
    </div>
  )
}
