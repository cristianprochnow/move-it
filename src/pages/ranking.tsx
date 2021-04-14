import Head from 'next/head'
import { RankingItem } from '../components/RankingItem'
import { SideMenuBar } from '../components/SideMenuBar'
import styles from '../styles/pages/Ranking.module.css'
import { useState } from 'react'

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
  const [usersGitHubData, setUsersGitHubData] = useState([])

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
              <RankingItem
                avatar={avatar}
                completedChallenges={completedChallenges}
                experience={experience}
                key={position}
                level={level}
                name={name}
                position={position}
              />
            ))
          }
        </main>
      </div>
    </>
  )
}
