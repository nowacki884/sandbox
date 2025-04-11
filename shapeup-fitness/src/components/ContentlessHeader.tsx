import { Link } from "react-router-dom"

import SmallLogo from "../assets/shape-up-logo-small.png"

export default function ContentlessHeader() {
  return (
    <header className="contentless-header">
      <div className="header-content">
        <Link to="/">
          <img src={SmallLogo} alt="shape up fitness logo" />
        </Link>
      </div>
    </header>
  )
}
