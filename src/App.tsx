import React, { useState } from 'react';
import { ExperienceBar } from './components/ExperienceBar';
import './styles/global.css'

function App() {
  const [currentExperience, setCurrentExperience] = useState(0)

  return (
    <div className="container">
        <ExperienceBar />

        <main className="increase-experience-box">
          <h1>Aumente sua experiência 🚀</h1>

          <div className="input-group">
            <input
              type="number"
              placeholder="Quanta experiência deseja adicionar ou remover (máximo 600 xp)?"
              min="0"
              max="600"
            />

            <button id="increase">Adicionar</button>
            <button id="decrease">Diminuir</button>
          </div>
        </main>
    </div>
  );
}

export default App;
