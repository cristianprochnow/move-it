import { useChallenges } from '../hooks/useChallenges'
import styles from '../styles/components/Profile.module.css'

interface ProfileProps {
  nickname: string
  name: string
  avatar: string
}

export function Profile({
  avatar,
  name,
  nickname
}: ProfileProps) {
  const { level } = useChallenges()

  return (
    <div className={styles.profileContainer}>
      <img src={avatar} alt={nickname} />

      <div>
        <strong>{name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div>
  )
}
