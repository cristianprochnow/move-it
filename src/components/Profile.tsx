import { useChallenges } from '../hooks/useChallenges'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
  const { level } = useChallenges()

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/cristianprochnow.png" alt="Cristian Prochnow"/>

      <div>
        <strong>Cristian Prochnow</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}
