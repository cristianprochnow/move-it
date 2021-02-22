import '../styles/components/experience-bar.css'

interface ExperienceBarProps {
  currentExperiencePercentage: number
  currentExperienceValue: number
}

export function ExperienceBar(props: ExperienceBarProps) {
  return (
    <header className="experience-bar">
      <span>0 xp</span>

      <div>
        <div style={{ width: `${props.currentExperiencePercentage}%` }}></div>

        <span
          className="current-experience"
          style={{ left: `${props.currentExperiencePercentage}%` }}
        >
          {props.currentExperienceValue} xp
        </span>
      </div>

      <span>600 xp</span>
    </header>
  )
}
