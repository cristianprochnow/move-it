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

        <table cellSpacing={0}>
          <thead className={styles.tableHead}>
            <tr>
              <td><strong>Posição</strong></td>
              <td><strong>Usuário</strong></td>
              <td><strong>Desafios</strong></td>
              <td><strong>Experiência</strong></td>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {
              ranking.map(({
                avatar,
                name,
                level,
                completedChallenges,
                experience
              }, position) => (
                <tr>
                  <td id={styles.position}>{position + 1}</td>
                  <td id={styles.userInformation}>
                    <img src={avatar} alt={name} />

                    <div>
                      <strong>{name}</strong>

                      <p>
                        <img src="./icons/level.svg" alt="Level"/>
                        Level {level}
                      </p>
                    </div>
                  </td>
                  <td id={styles.challenges}>{completedChallenges} completados</td>
                  <td id={styles.experience}>{experience} xp</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
