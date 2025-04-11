import { Link } from "react-router-dom"

import Card1Image from "../../../assets/people/card-1-image.png"
import Card2Image from "../../../assets/people/card-2-image.png"
import Card3Image from "../../../assets/people/card-3-image.png"

export default function Cards() {
  return (
    <section className="full">
      <div className="section-content">
        <div className="section-header">
          <h1>TRENUJ JAK CHCESZ</h1>
        </div>
        <div className="section-body card-container">
          <div className="card" style={{ backgroundImage: `url(${Card1Image})` }}>
            <div className="card-overlay">
              <h2 className="card-header">Siłownia</h2>
              <p>Ćwicz dowolnie korzystając z szerokiego wyboru maszyn i ciężarów</p>
            </div>
          </div>
          <div className="card" style={{ backgroundImage: `url(${Card2Image})` }}>
            <div className="card-overlay">
              <h2 className="card-header">Zajęcia</h2>
              <p>Przyjdź na zajęcia dostosowane to każdego poziomu zaawansowania</p>
            </div>
          </div>
          <div className="card" style={{ backgroundImage: `url(${Card3Image})` }}>
            <div className="card-overlay">
              <h2 className="card-header">Instruktorzy</h2>
              <p>Skorzystaj ze wsparcia wykwalifikowanych trenerów personalnych</p>
            </div>
          </div>
        </div>
        <div className="section-footer">
          <Link to="/zajecia" className="big-button">
            Dowiedz się więcej &gt;
          </Link>
        </div>
      </div>
    </section>
  )
}
