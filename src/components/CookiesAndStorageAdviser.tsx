import { useState } from 'react'
import { FiThumbsUp } from 'react-icons/fi'
import styles from '../styles/components/CookiesAndStorageAdviser.module.css'

export function CookiesAndStorageAdviser() {
  const [isVisible, setVisible] = useState(true)

  function handleCloseAdviser() {
    setVisible(false)
  }

  return (
    <span
      className={styles.cookiesAndStorageAdviserContainer}
      style={isVisible ? null : {visibility: 'hidden'}}
    >
      <div>
        <strong>Cookies, dados e algum tempero antes de concluir.</strong>
        <p>
          Ao usar esse app, alguns cookies serão definidos e outros dados serão
          guardados¹ no banco de dados, mas tudo isso apenas para proporcionar
          uma forma mais dinâmica de usufruir desse aplicativo. Então relaxe,
          estique as pernas, e bora ser produtivo!
        </p>
        <span>
          ¹ Username do GitHub, level, experiência atual, e número de
          desafios completados.
        </span>
      </div>

      <button
        type="button"
        onClick={handleCloseAdviser}
      >
        <FiThumbsUp />
        Belezura!
      </button>
    </span>
  )
}
