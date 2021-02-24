import { useEffect, useState } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
  const [time, setTime] = useState(25 * 60)
  const [active, setActive] = useState(false)
  const [alreadyStarted, setAlreadyStarted] = useState(false)
  const [isReseted, setReseted] = useState(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes)
    .padStart(2, '0')
    .split('')
  const [secondLeft, secondRight] = String(seconds)
    .padStart(2, '0')
    .split('')

  function startCountdown() {
    setActive(true)
    setAlreadyStarted(true)
    setReseted(false)
  }

  function pauseCountdown() {
    setActive(false)
    setTime(time)
  }

  function resetCountdown() {
    setActive(false)
    setAlreadyStarted(false)
    setReseted(true)
  }

  useEffect(() => {
    if (isReseted) {
      setTime(25 * 60)

      return
    }

    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  }, [active, time])

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        !active ? (
          <button
            type="button"
            className={styles.countdownButton}
            id={ alreadyStarted ? styles.continueCountdownButton : '' }
            onClick={startCountdown}
          >
            {
              !alreadyStarted ? 'Iniciar um ciclo' : 'Continuar ciclo'
            }
          </button>
        ) : (
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.countdownButton}
              id={styles.pauseCountdownButton}
              onClick={pauseCountdown}
            >
              Pausar ciclo
            </button>

            <button
              type="button"
              className={styles.countdownButton}
              id={styles.resetCountdownButton}
              onClick={resetCountdown}
            >
              Reiniciar
            </button>
          </div>
        )
      }
    </div>
  )
}
