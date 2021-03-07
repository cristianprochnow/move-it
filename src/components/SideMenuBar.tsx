import { FiHome, FiAward } from 'react-icons/fi'
import styles from '../styles/components/SideMenuBar.module.css'

export function SideMenuBar() {
  return (
    <div className={styles.sideMenuBarContainer}>
      <img src="./logo.svg" alt="Move.it" />

      <nav>
        <button type="button">
          <span></span>

          <FiHome size={32} />
        </button>
        <button type="button" className={styles.selected}>
          <span></span>

          <FiAward size={32} />
        </button>
      </nav>

      <span></span>
    </div>
  )
}
