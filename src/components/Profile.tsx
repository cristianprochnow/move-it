import styles from '../styles/components/Profile.module.css'

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/cristianprochnow.png" alt="Cristian Prochnow"/>

      <div>
        <strong>Cristian Prochnow</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}
