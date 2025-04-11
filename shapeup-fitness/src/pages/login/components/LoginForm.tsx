import { signInWithEmailAndPassword } from "firebase/auth"
import { FormEvent, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { auth } from "../../../firebase/firebase"

import checkEmail from "../../../functions/checkEmail"

import Loader from "../../../components/Loader"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const emailVal: string | undefined = emailRef.current?.value
    const passVal: string | undefined = passRef.current?.value

    if (!emailVal || !passVal) return

    const isEmailOK: boolean = checkEmail(emailVal)

    if (!isEmailOK) return

    if (!isLoading) setIsLoading(true)

    signInWithEmailAndPassword(auth, emailVal, passVal)
      .then((user) => {
        console.log("logged in successfully!")
      })
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          ref={emailRef}
          name="email"
          autoComplete="true"
          type="text"
          placeholder="Adres e-mail"
          disabled={isLoading}
        />
      </div>
      <div className="form-row">
        <input
          ref={passRef}
          name="password"
          type="password"
          placeholder="Hasło"
          disabled={isLoading}
        />
      </div>
      <div className="form-row">
        <Link to="/odzyskiwanie" style={isLoading ? { pointerEvents: "none", opacity: 0.5 } : {}}>
          Nie pamiętasz hasła?
        </Link>
      </div>
      <div className="form-footer">
        <Link to="/zarejestruj" style={isLoading ? { pointerEvents: "none", opacity: 0.5 } : {}}>
          Nie masz konta? &gt;
        </Link>
        <button className="big-button" disabled={isLoading}>
          <p style={isLoading ? { opacity: 0 } : { opacity: 1 }}>Zaloguj Się</p>
          {isLoading && <Loader />}
        </button>
      </div>
    </form>
  )
}
