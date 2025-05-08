import { Dispatch, SetStateAction } from "react"

interface TimeSelectorButtonProps {
  time: number
  selectedTime: number
  setTime: Dispatch<SetStateAction<number>>
}

export default function TimeSelectorButton(props: TimeSelectorButtonProps) {
  return (
    <button
      className={props.selectedTime === props.time ? "active" : ""}
      onClick={() => props.setTime(props.time)}
    >
      {props.time / 60} min
    </button>
  )
}
