import { GetServerSideProps } from 'next'
import Head from 'next/head'
import axios, { AxiosResponse } from 'axios'
import { RankingItem } from '../components/RankingItem'
import { SideMenuBar } from '../components/SideMenuBar'
import styles from '../styles/pages/Ranking.module.css'
import { fetchUsers } from '../utils/api/fetchUsers'

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

interface RankingProps {
  users: Array<UserData>
}

interface UserData {
  avatar_url: string;
  name: string
}

export default function Ranking({users}: RankingProps) {
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
            users.map(({
              avatar_url,
              name
            }, position) => (
              <RankingItem
                avatar={avatar_url}
                completedChallenges={0}
                experience={0}
                key={position}
                level={0}
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

export const getServerSideProps: GetServerSideProps = async () => {


  return {
    props: {}
  }
}
