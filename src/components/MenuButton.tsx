import { IconType } from 'react-icons/lib'
import styles from '../styles/components/MenuButton.module.css'

interface MenuButtonProps {
  Icon: IconType
  isSelected: boolean
}

export function MenuButton({ Icon, isSelected }: MenuButtonProps) {
  return (
    <button
      type="button"
      className={
        isSelected
          ? `${styles.menuButton} ${styles.selected}`
          : styles.menuButton
      }
    >
      {
        isSelected
          ? (<span></span>)
          : null
      }

      <Icon size={32} />
    </button>
  )
}
