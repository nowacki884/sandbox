import { DaySchedule } from "../../../types"

interface DayScheduleProps {
  data: DaySchedule
}

export default function Schedule({ data }: DayScheduleProps) {
  return (
    <section className="exercise-schedule">
      <div className="section-content">
        <div className="section-header">
          <h1>{data.dayName}</h1>
        </div>
        <div className="section-body">
          {data.exercises.map((ex, _) => (
            <div key={ex.key} className="exercise-wrapper">
              <div className="exercise-header">
                <h1>{ex.name}</h1>
                <h2>{ex.startingHour}</h2>
              </div>
              <div className="exercise-info">
                <p>Czas: {ex.timeInMinutes} min</p>
                <p>Instruktor: {ex.instructorName}</p>
                <p>Poziom trudności: {ex.difficulty}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="section-footer section-break">
          <button className="big-button">Zapisz się &gt;</button>
        </div>
      </div>
    </section>
  )
}
