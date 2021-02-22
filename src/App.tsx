import React, { useEffect, useState } from 'react';
import { ExperienceBar } from './components/ExperienceBar';
import './styles/global.css'

function App() {
  const maxExperience = 600
  const minExperience = 0
  const [currentExperience, setCurrentExperience] = useState(0)
  const [experienceToIncrease, setExperienceToIncrease] = useState(0)
  const [progressPercentage, setProgressPercentage] = useState(0)

  function handleIncreaseExperience(experienceToIncrease: number) {
    if (experienceToIncrease > 600) {
      setCurrentExperience(maxExperience)

      return
    }

    setCurrentExperience(currentExperience + experienceToIncrease)
  }

  function handleDecreaseExperience(experienceToDecrease: number) {
    const isResultLowerThanZero = currentExperience - experienceToDecrease < 0

    if (isResultLowerThanZero) {
      setCurrentExperience(minExperience)

      return
    }

    setCurrentExperience(currentExperience - experienceToDecrease)
  }

  function calculatePercentage(
    currentExperience: number,
    maxValueOfExperience: number
  ): number {
    const percentage = Math.round(
      ((currentExperience / maxValueOfExperience) * 100)
    )

    return percentage
  }

  useEffect( () => {
    setProgressPercentage(
      calculatePercentage(
        currentExperience,
        maxExperience
      )
    )
  }, [currentExperience] )

  return (
    <div className="container">
        <ExperienceBar
          currentExperiencePercentage={progressPercentage}
          currentExperienceValue={currentExperience}
        />

        <main className="increase-experience-box">
          <h1>Aumente sua experiência 🚀</h1>
          <strong>(O valor máximo é 600 xp)</strong>

          <div className="input-group">
            <input
              type="number"
              placeholder="Quanta experiência deseja adicionar ou remover (máximo 600 xp)?"
              min="0"
              max="600"
              value={experienceToIncrease}
              onChange={ event =>
                setExperienceToIncrease(
                  Number(event.target.value)
                )
              }
            />

            <button
              id="increase"
              onClick={ () => handleIncreaseExperience(experienceToIncrease) }
            >Adicionar</button>
            <button
              id="decrease"
              onClick={ () => handleDecreaseExperience(experienceToIncrease) }
            >Diminuir</button>
          </div>
        </main>
    </div>
  );
}

export default App;
