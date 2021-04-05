import { useState } from 'react'
import { GenIcon } from 'react-icons'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX, FiXCircle } from 'react-icons/fi'
import styles from '../styles/components/ToastNotification.module.css'

export interface ToastNotificationProps {
  type: 'information' | 'success' | 'warning' | 'error'
  message: string
}

export function ToastNotification({
  type,
  message
}: ToastNotificationProps) {
  const Icons = {
    information: FiInfo,
    success: FiCheckCircle,
    warning: FiAlertCircle,
    error: FiXCircle
  }

  const Icon = Icons[type]

  const [isActive, setActive] = useState(true)

  function handleClose() {
    setActive(false)
  }

  return (
    <div
      className={`${styles.toastNotificationContainer} ${styles[type]}`}
      style={{ visibility: isActive ? 'visible' : 'hidden' }}
    >
      <Icon size={20} />

      <p>{message}</p>

      <button
        type="button"
        onClick={handleClose}
      >
        <FiX size={20} />
      </button>
    </div>
  )
}
