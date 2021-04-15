import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { COOKIES_NAMES } from '../constants/cookies'
import { LevelUpModal } from '../components/LevelUpModal'
import axios from 'axios'

interface ChallengesContextData {
  level: number
  currentExperience: number
  completedChallenges: number
  experienceToNextLevel: number
  activeChallenge: Challenge
  levelUp: () => void
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
  closeLevelUpModal: () => void
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesProviderProps {
  children: ReactNode
  level: number
  currentExperience: number
  completedChallenges: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
  const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)

    updateSavedLevel(level, getUserIdFromCookie())
      .then(() => console.info('Saved level updated!'))
      .catch(() => console.error('That it was not possible to update saved level now.'))

    async function updateSavedLevel(level: number, userId: string) {
      const routeUrl = `/api/level/${userId}`

      await axios.put(routeUrl, {level})
    }
  }

  function getUserIdFromCookie() {
    return Cookies.get(COOKIES_NAMES.userId)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(
      Math.random() * challenges.length
    )
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('./notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
        icon: './favicon.png'
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setCompletedChallenges(completedChallenges + 1)

    const userId = getUserIdFromCookie()

    updateSavedExperienceAndChallenges(
      completedChallenges,
      currentExperience,
      userId
    )
      .then(() => console.info('Experience and challenges updated successfully!'))
      .catch(() => console.error('Sorry, something went wrong while updating experience and challenges.'))

    async function updateSavedExperienceAndChallenges(
      completedChallenges: number,
      currentExperience: number,
      userId: string
    ) {
      const apiRoute = `/api/challenge-xp/${userId}`

      await axios.put(
        apiRoute,
        {
          completedChallenges,
          currentExperience
        }
      )
    }
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set(COOKIES_NAMES.level, String(level))
    Cookies.set(COOKIES_NAMES.currentExperience, String(currentExperience))
    Cookies.set(COOKIES_NAMES.completedChallenges, String(completedChallenges))
  }, [level, currentExperience, completedChallenges])

  return (
    <ChallengesContext.Provider value={{
      level,
      levelUp,
      currentExperience,
      completedChallenges,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
      closeLevelUpModal
    }}>
      {children}

      {
        isLevelUpModalOpen && <LevelUpModal />
      }
    </ChallengesContext.Provider>
  )
}
