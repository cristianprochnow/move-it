import { useState } from 'react'
import Head from 'next/head'
import useSWR, { SWRResponse } from 'swr'
import { UserGitHubData } from './api/users'
import ReactLoading from 'react-loading'
import { RankingItem } from '../components/RankingItem'
import { SideMenuBar } from '../components/SideMenuBar'
import styles from '../styles/pages/Ranking.module.css'

export default function Ranking() {
  const {data}: SWRResponse<Array<UserGitHubData>, any> = useSWR('/api/users')

  if (!data) {
    return (
      <>
        <Head>
          <title>Ranking | Move.it</title>
        </Head>

        <SideMenuBar />

        <div className={styles.rankingContainer}>
          <h1>Leaderboard</h1>

          <ReactLoading
            width={50}
            className={styles.loadingSpinner}
            type="spokes"
            color="#5965E0"
          />
        </div>
      </>
    )
  }

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
            data.map(({
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
