import { Link } from "react-router-dom"

import BigLogo from "../assets/shape-up-logo-big.png"

export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-element">
          <h1>KONTAKT</h1>
          <div className="footer-element-content">
            <p>+48 881 418 887</p>
            <p>Shape Up Fitness Stęszew</p>
            <p>ul. Gabriela Narutowicza 2</p>
            <p>62-060 Stęszew</p>
          </div>
        </div>
        <div className="footer-element">
          <h1>GODZINY</h1>
          <div className="footer-element-content">
            <p>Siłownia</p>
            <p>Pn-Pt: 15:00 - 22:00</p>
            <p>Sb: 10:00 - 18:00</p>
            <p>Nd: 10:00 - 16:00</p>
          </div>
          <div className="footer-element-content">
            <p>Treningi Personalne</p>
            <p>Pn-Pt: 6:30 - 22:00</p>
            <p>Sb: 8:00 - 18:00</p>
            <p>Nd: 10:00 - 16:00</p>
          </div>
        </div>
        <div className="footer-element-content">
          <Link to="/">
            <img src={BigLogo} alt="shape up fitness logo" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
