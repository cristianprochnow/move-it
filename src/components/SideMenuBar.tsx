import { useEffect, useState } from 'react'
import { FiHome, FiAward } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { MenuButton } from './MenuButton'
import styles from '../styles/components/SideMenuBar.module.css'

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

      <span></span>
    </div>
  )
}
