import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getUserPassDataWithEmail } from "../../../firebase"

import checkEmail from "../../../functions/checkEmail"

import Loader from "../../../components/Loader"

export default function EmailForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navFn = useNavigate()

  const emailRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault()

    const emailVal: string | undefined = emailRef.current?.value

    if (!emailVal) return

    const isEmailOK: boolean = checkEmail(emailVal)

    if (!isEmailOK) return

    setIsLoading(true)

    try {
      const userPassData = await getUserPassDataWithEmail(emailVal)
      if (!userPassData) return setIsLoading(false)
      navFn(`/sprawdz/${userPassData.userId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="find-form">
      <input
        type="text"
        name="e-mail"
        ref={emailRef}
        placeholder="Adres e-mail"
        autoComplete="true"
        disabled={isLoading}
      />
      <button type="submit" className="big-button" disabled={isLoading}>
        <p style={isLoading ? { opacity: 0 } : { opacity: 1 }}>Dalej &gt;</p>
        {isLoading && <Loader />}
      </button>
    </form>
  )
}
