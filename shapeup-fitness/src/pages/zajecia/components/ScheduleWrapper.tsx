import { useEffect, useState } from "react"

import { getExerciseSchedule } from "../../../firebase"

import { useDataContext, useSetDataContext } from "../../../contexts/DataContext"

import { DaySchedule } from "../../../types"

import Loader from "../../../components/Loader"

import Schedule from "./Schedule"

export default function ScheduleWrapper() {
  const [currentExerciseSchedule, setCurrentExerciseSchedule] = useState<DaySchedule[] | null>(null)

  const dataContext = useDataContext()
  const setDataContext = useSetDataContext()

  useEffect(() => {
    if (dataContext.zajecia) return setCurrentExerciseSchedule(dataContext.zajecia)

    getExerciseSchedule()
      .then((schedule) => {
        setDataContext("zajecia", schedule, null, null, null, null)
        setCurrentExerciseSchedule(schedule)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {currentExerciseSchedule ? (
        currentExerciseSchedule.map((ds, index) => <Schedule key={index} data={ds} />)
      ) : (
        <section className="full">
          <Loader />
        </section>
      )}
    </>
  )
}
