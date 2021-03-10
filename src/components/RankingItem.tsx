import styles from '../styles/components/RankingItem.module.css'

interface RankingItemProps {
  avatar: string
  completedChallenges: number
  experience: number
  level: number
  name: string
  position: number
}

export function RankingItem({
  avatar,
  completedChallenges,
  experience,
  level,
  name,
  position
}: RankingItemProps) {
  return (
    <span className={`${styles.rankingItem} ${styles.gridDefaultTemplate}`}>
      <div>{position + 1}</div>
      <div>
        <img src={avatar} alt={name} />
        <span>
          <strong>{name}</strong>
          <p>
            <img src="./icons/level.svg" alt="Level" />
            Level {level}
          </p>
        </span>
      </div>
      <div>
        <p>
          <span>{completedChallenges}</span> completados
        </p>
      </div>
      <div>
        <p>
          <span>{experience}</span> xp
        </p>
      </div>
    </span>
  )
}
