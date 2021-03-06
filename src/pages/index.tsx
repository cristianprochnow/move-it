import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      <div id={styles.heroImage}>
        <img src="./hero-image.svg" alt="Hero image"/>
      </div>
      <section id={styles.homePresentation}>
        <img src="./logo-full-white.svg" alt="Move.it"/>

        <h1>Bem-vindo</h1>

        <span>
          <img src="./icons/github.svg" alt="Github"/>
          <strong>Faça login com seu Github para começar</strong>
        </span>

        <div>
          <input type="text" placeholder="Digite seu username" />
          <button type="button">
            <img src="./icons/arrow-right.svg" alt="Go to next page"/>
          </button>
        </div>
      </section>
    </div>
  )
}
