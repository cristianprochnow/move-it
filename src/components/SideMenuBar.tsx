import { useEffect, useState } from 'react'
import { FiHome, FiAward, FiLogOut } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { MenuButton } from './MenuButton'
import Cookies from 'js-cookie'
import styles from '../styles/components/SideMenuBar.module.css'
import { COOKIES_NAMES } from '../constants/cookies'

export function SideMenuBar() {
  const router = useRouter()
  const [actualRoute, setActualRoute] = useState('')

  function handleChangeRoute(destinyRoute: string) {
    const isAtDesiredPage = destinyRoute === actualRoute

    if (isAtDesiredPage) {
      return
    } else {
      router.push(destinyRoute)
    }
  }

  function handleLogOut() {
    cleanSession()
    redirectToHome()

    function cleanSession() {
      Cookies.remove(COOKIES_NAMES.completedChallenges)
      Cookies.remove(COOKIES_NAMES.currentExperience)
      Cookies.remove(COOKIES_NAMES.gitHubUsername)
      Cookies.remove(COOKIES_NAMES.level)
    }

    function redirectToHome() {
      router.push('/')
    }
  }

  useEffect(() => {
    setActualRoute(router.pathname)
  }, [router.pathname])

  return (
    <div className={styles.sideMenuBarContainer}>
      <img src="./logo.svg" alt="Move.it" />

      <nav>
        <MenuButton
          Icon={FiHome}
          isSelected={(actualRoute === '/app')}
          onClick={() => handleChangeRoute('/app')}
        />
        <MenuButton
          Icon={FiAward}
          isSelected={(actualRoute === '/ranking')}
          onClick={() => handleChangeRoute('/ranking')}
        />
      </nav>

      <span>
        <MenuButton
          Icon={FiLogOut}
          onClick={handleLogOut}
        />
      </span>
    </div>
  )
}
