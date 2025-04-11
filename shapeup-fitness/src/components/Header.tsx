import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import { auth } from "../firebase/firebase"

import { useSetDataContext } from "../contexts/DataContext"
import { useUserContext } from "../contexts/UserContext"

import SmallLogo from "../assets/shape-up-logo-small.png"

import CloseMenu from "../assets/icons/close-menu.svg"
import HamburberMenu from "../assets/icons/hamburber-menu.svg"
import QRCode from "../assets/icons/qr-code.svg"

import Loader from "./Loader"

export default function Header() {
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState<boolean>(false)

  const userContext = useUserContext()
  const setDataContext = useSetDataContext()
  const { pathname } = useLocation()
  const navigateFn = useNavigate()

  const navOptions = [
    {
      path: "/zajecia",
      displayName: "Zajęcia",
    },
    {
      path: "/instruktorzy",
      displayName: "Instruktorzy",
    },
    {
      path: "/aktualnosci",
      displayName: "Aktualności",
    },
    {
      path: "/oferta",
      displayName: "Oferta",
    },
    {
      path: "/kontakt",
      displayName: "Kontakt",
    },
  ]

  useEffect(() => {
    if (window.scrollY === 0) return
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  function openSidebarMenu(): void {
    setIsSidebarMenuOpen(true)
  }

  function closeSidebarMenu(): void {
    setIsSidebarMenuOpen(false)
  }

  function changePage(path: string): void {
    setIsSidebarMenuOpen(false)

    setTimeout(() => {
      navigateFn(path)
    }, 200)
  }

  function logOut(): void {
    setDataContext("aktualnyKarnet", null, null, null, null, null)
    setDataContext("daneKarnetu", null, null, null, null, null)
    signOut(auth)
    setIsSidebarMenuOpen(false)
  }

  return (
    <header>
      <div className="header-content">
        <Link to="/">
          <img src={SmallLogo} alt="shape up fitness logo" />
        </Link>
        <nav>
          {navOptions.map((option, idx) => (
            <Link key={idx} to={option.path} className={pathname === option.path ? "active" : ""}>
              {option.displayName}
            </Link>
          ))}
        </nav>
        {!userContext.loaded ? (
          <Loader />
        ) : userContext.data ? (
          <Link to="/profil" className="qr-code-button">
            <img src={QRCode} alt="qr code icon" />
          </Link>
        ) : (
          <Link to="/zaloguj" className="big-button">
            Zaloguj Się
          </Link>
        )}
        <button className="open-sidebar-menu-button" onClick={openSidebarMenu}>
          <img src={HamburberMenu} alt="menu button" />
        </button>
        <div
          className={
            isSidebarMenuOpen ? "sidebar-menu-wrapper" : "sidebar-menu-wrapper sidebar-menu-closed"
          }
        >
          <div className="sidebar-menu-content">
            <div className="sidebar-menu-header">
              <button onClick={() => changePage("/")}>
                <img src={SmallLogo} alt="shape up fitness logo" />
              </button>
              <button onClick={closeSidebarMenu}>
                <img src={CloseMenu} alt="close menu button" />
              </button>
            </div>
            <nav className="sidebar-menu-body">
              {navOptions.map((option, idx) => (
                <button key={idx} onClick={() => changePage(option.path)}>
                  <h1 className={pathname === option.path ? "active" : ""}>{option.displayName}</h1>
                </button>
              ))}
            </nav>
            <div className="sidebar-menu-footer">
              {userContext.data ? (
                <button className="big-button" onClick={logOut}>
                  Wyloguj Się
                </button>
              ) : (
                <button className="big-button" onClick={() => changePage("/zaloguj")}>
                  Zaloguj Się
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
