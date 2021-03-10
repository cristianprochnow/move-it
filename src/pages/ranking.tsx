import Head from 'next/head'
import { SideMenuBar } from '../components/SideMenuBar'
import styles from '../styles/pages/Ranking.module.css'

const ranking = [
  {
    name: 'Cristian Prochnow',
    avatar: 'https://github.com/cristianprochnow.png',
    level: 21,
    completedChallenges: 84,
    experience: 111209
  },
  {
    name: 'Cristian Prochnow',
    avatar: 'https://github.com/cristianprochnow.png',
    level: 21,
    completedChallenges: 84,
    experience: 111209
  },
  {
    name: 'Cristian Prochnow',
    avatar: 'https://github.com/cristianprochnow.png',
    level: 21,
    completedChallenges: 84,
    experience: 111209
  },
  {
    name: 'Cristian Prochnow',
    avatar: 'https://github.com/cristianprochnow.png',
    level: 21,
    completedChallenges: 84,
    experience: 111209
  },
  {
    name: 'Cristian Prochnow',
    avatar: 'https://github.com/cristianprochnow.png',
    level: 21,
    completedChallenges: 84,
    experience: 111209
  },
  {
    name: 'Cristian Prochnow',
    avatar: 'https://github.com/cristianprochnow.png',
    level: 21,
    completedChallenges: 84,
    experience: 111209
  }
]

export default function Ranking() {
  return (
    <>
      <Head>
        <title>Ranking | Move.it</title>
      </Head>

      <SideMenuBar />

      <div className={styles.rankingContainer}>
        <h1>Leaderboard</h1>

        <header className={styles.gridDefaultTemplate}>
          <strong>Posição</strong>
          <strong>Usuário</strong>
          <strong>Desafios</strong>
          <strong>Experiência</strong>
        </header>

        <main>
          {
            ranking.map(({
              avatar,
              completedChallenges,
              experience,
              level,
              name
            }, position) => (
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
            ))
          }
        </main>
      </div>
    </>
  )
}
