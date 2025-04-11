import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import Loader from "../../../components/Loader"

export default function IdForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navFn = useNavigate()

  const idRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    const idVal: string | undefined = idRef.current?.value

    if (!idVal) return

    setIsLoading(true)

    navFn(`/sprawdz/${idVal}`)
  }

  return (
    <form onSubmit={handleSubmit} className="find-form">
      <input
        type="text"
        name="id"
        placeholder="ID użytkownika"
        ref={idRef}
        autoComplete="false"
        disabled={isLoading}
      />
      <button type="submit" className="big-button" disabled={isLoading}>
        <p style={isLoading ? { opacity: 0 } : { opacity: 1 }}>Dalej &gt;</p>
        {isLoading && <Loader />}
      </button>
    </form>
  )
}
