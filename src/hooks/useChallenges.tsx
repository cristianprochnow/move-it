import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'

export function useChallenges() {
  const challengeContext = useContext(ChallengesContext)

  return challengeContext
}
