import { FiHome, FiAward } from 'react-icons/fi'
import { MenuButton } from './MenuButton'
import styles from '../styles/components/SideMenuBar.module.css'

export function SideMenuBar() {
  return (
    <div className={styles.sideMenuBarContainer}>
      <img src="./logo.svg" alt="Move.it" />

      <nav>
        <MenuButton Icon={FiHome} isSelected={true} />
        <MenuButton Icon={FiAward} isSelected={false} />
      </nav>

      <span></span>
    </div>
  )
}
