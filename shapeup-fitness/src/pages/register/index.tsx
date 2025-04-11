import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"

import Header from "../../components/Header"
import Loader from "../../components/Loader"

import RegisterForm from "./components/RegisterForm"

import LoginHeroBanner from "../../assets/people/login-hero-banner.png"
import BigLogo from "../../assets/shape-up-logo-big.png"

export default function Register() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const userContext = useUserContext()
  const navFn = useNavigate()

  useEffect(() => {
    if (!userContext.loaded) return

    if (userContext.data?.displayName) {
      navFn("/")
      return
    }

    setIsLoaded(userContext.loaded)
  }, [userContext])

  return !isLoaded ? (
    <section className="full">
      <Loader />
    </section>
  ) : (
    <>
      <Header />
      <main className="page login-page">
        <section className="hero full" style={{ backgroundImage: `url(${LoginHeroBanner})` }}>
          <div className="background-overlay">
            <div className="section-content">
              <div className="account-form-wrapper">
                <div className="account-form-logo">
                  <Link to="/">
                    <img src={BigLogo} alt="shape up fitness logo" />
                  </Link>
                </div>
                <div className="account-form-header">
                  <h1>Zarejestruj się</h1>
                </div>
                <div className="account-form-content">
                  <RegisterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
