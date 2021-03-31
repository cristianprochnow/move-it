import { GetServerSideProps } from 'next'
import Head from 'next/head'
import styles from '../styles/pages/App.module.css'
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import { SideMenuBar } from '../components/SideMenuBar';
import axios, { AxiosResponse } from 'axios';

interface HomeProps {
  level: number
  currentExperience: number
  completedChallenges: number
  userGitHubData: UserGitHubData
}

interface UserGitHubData {
  nickname: string
  name: string
  avatar: string
}

export default function App({
  level,
  currentExperience,
  completedChallenges,
  userGitHubData
}: HomeProps) {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      completedChallenges={completedChallenges}
    >
      <SideMenuBar />

      <div className={styles.container}>
        <Head>
          <title>App | Move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile
                avatar={userGitHubData.avatar}
                name={userGitHubData.name}
                nickname={userGitHubData.nickname}
              />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    level,
    currentExperience,
    completedChallenges,
    githubUsername
  } = context.req.cookies

  const { data } = await fetchGitHubDataByUser(githubUsername)

  const userGitHubData = {
    nickname: githubUsername,
    name: data.name,
    avatar: data.avatar_url
  }

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges),
      userGitHubData
    }
  }

  async function fetchGitHubDataByUser(githubUsername: string) {
    interface GitHubFetching {
      name: string
      avatar_url: string
    }

    const gitHubUri = `https://api.github.com/users/${githubUsername}`
    const gitHubFetching: AxiosResponse<GitHubFetching> = await axios.get(gitHubUri)

    return gitHubFetching
  }
}
