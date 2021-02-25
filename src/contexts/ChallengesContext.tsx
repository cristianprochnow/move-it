import { createContext, ReactNode, useEffect, useState } from "react";
import challenges from '../../challenges.json'

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
}

interface Challenge {
  type: 'body' | 'eye'
  description: string
  amount: number
}

interface ChallengesProviderProps {
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  function levelUp() {
    setLevel(level + 1)
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

  useEffect(() => {
    Notification.requestPermission()
  }, [])

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
      completeChallenge
    }}>
      {children}
    </ChallengesContext.Provider>
  )
}
