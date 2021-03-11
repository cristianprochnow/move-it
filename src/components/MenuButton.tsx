import { IconType } from 'react-icons/lib'
import { ButtonHTMLAttributes } from 'react'
import styles from '../styles/components/MenuButton.module.css'

interface MenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType
  isSelected?: boolean
}

export function MenuButton({ Icon, isSelected, ...rest }: MenuButtonProps) {
  return (
    <button
      type="button"
      className={
        isSelected
          ? `${styles.menuButton} ${styles.selected}`
          : styles.menuButton
      }
      onClick={rest.onClick}
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
