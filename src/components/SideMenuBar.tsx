import { FiHome, FiAward } from 'react-icons/fi'
import { MenuButton } from './MenuButton'
import styles from '../styles/components/SideMenuBar.module.css'
import { useRouter } from 'next/router'

export function SideMenuBar() {
  const router = useRouter()

  function handleChangePage(page: string) {
    const destinyRoute = `/${page}`

    const isAlreadyAtThePage = (router.pathname === destinyRoute) ? true : false

    if (isAlreadyAtThePage) {
      return
    } else {
      router.push(destinyRoute)
    }
  }

  return (
    <div className={styles.sideMenuBarContainer}>
      <img src="./logo.svg" alt="Move.it" />

      <nav>
        <MenuButton
          Icon={FiHome}
          isSelected={true}
          onClick={() => handleChangePage('app')}
        />
        <MenuButton
          Icon={FiAward}
          isSelected={false}
          onClick={() => handleChangePage('ranking')}
        />
      </nav>

      <span></span>
    </div>
  )
}
