import { Link } from "react-router-dom"

import LocationIcon from "../../../assets/icons/location.svg"
import TimeIcon from "../../../assets/icons/time.svg"

import MapLocation from "../../../assets/map-location.png"

export default function Info() {
  return (
    <section className="full">
      <div className="section-content">
        <div className="section-header">
          <h1>ZNAJDŹ NAS</h1>
        </div>
        <div className="section-body section-info">
          <img
            className="map-location-image"
            src={MapLocation}
            alt="gym map location"
            loading="lazy"
          />
          <div className="section-body-content">
            <h1>STĘSZEW</h1>
            <div className="info">
              <img src={LocationIcon} alt="location icon" />
              <p>ul. Gabriela Narutowicza 2, 62-060 Stęszew</p>
            </div>
            <div className="info">
              <img src={TimeIcon} alt="time icon" />
              <div>
                <p>Godziny otwarcia:</p>
                <p>Pn-Pt: 15:00 - 22:00</p>
                <p>Sb: 10:00 - 18:00</p>
                <p>Nd: 10:00 - 16:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="section-footer">
          <Link to="/kontakt" className="big-button">
            Skontaktuj się z nami &gt;
          </Link>
        </div>
      </div>
    </section>
  )
}
