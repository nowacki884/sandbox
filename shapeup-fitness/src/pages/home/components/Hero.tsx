import { Link } from "react-router-dom"

import HeroBanner from "../../../assets/people/main-hero-banner.png"

export default function Hero() {
  return (
    <section className="hero full" style={{ backgroundImage: `url(${HeroBanner})` }}>
      <div className="section-content">
        <div className="section-body">
          <div>
            <h1>TWOJE CELE</h1>
            <h1>NASZA MOTYWACJA</h1>
          </div>
          <Link to="/zajecia" className="big-button">
            Ćwicz z nami!
          </Link>
        </div>
      </div>
    </section>
  )
}
