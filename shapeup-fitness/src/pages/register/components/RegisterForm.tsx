import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { auth } from "../../../firebase/firebase"

import checkEmail from "../../../functions/checkEmail"
import checkPassword from "../../../functions/checkPassword"

import Loader from "../../../components/Loader"
import { registerNewUser } from "../../../firebase"

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const confPassRef = useRef<HTMLInputElement>(null)

  const navFn = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const nameVal: string | undefined = nameRef.current?.value
    const emailVal: string | undefined = emailRef.current?.value
    const passVal: string | undefined = passRef.current?.value
    const confPassVal: string | undefined = confPassRef.current?.value

    if (!nameVal || !emailVal || !passVal || !confPassVal) return

    const isEmailOK: boolean = checkEmail(emailVal)

    if (!isEmailOK) return

    const arePasswordsEqual: boolean = passVal === confPassVal

    if (!arePasswordsEqual) return

    const isPassOK: boolean = checkPassword(passVal)

    if (!isPassOK) return

    setIsLoading(true)

    registerNewUser(nameVal, emailVal, passVal, () => navFn("/"))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          ref={nameRef}
          autoComplete="false"
          type="text"
          name="name"
          placeholder="Imię"
          disabled={isLoading}
        />
      </div>
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
        <input
          ref={confPassRef}
          name="confirm password"
          type="password"
          placeholder="Powtórz hasło"
          disabled={isLoading}
        />
      </div>
      {/* <div className="form-row" style={{ cursor: "pointer" }} onClick={handleRemember}>
        <input type="checkbox" name="remember" checked={remember} readOnly={true} />
        <p>Zapamiętaj mnie</p>
      </div> */}
      <div className="form-footer">
        <Link to="/zaloguj" style={isLoading ? { pointerEvents: "none", opacity: 0.5 } : {}}>
          Masz już konto? &gt;
        </Link>
        <button className="big-button" type="submit" disabled={isLoading}>
          <p style={isLoading ? { opacity: 0 } : { opacity: 1 }}>Zarejestruj Się</p>
          {isLoading && <Loader />}
        </button>
      </div>
    </form>
  )
}
