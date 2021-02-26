import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

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
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('completedChallenges', String(completedChallenges))
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
