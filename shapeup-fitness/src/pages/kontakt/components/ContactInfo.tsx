import MapLocation from "../../../assets/map-location.png"

export default function ContactInfo() {
  return (
    <section className="contact-section">
      <div className="section-content">
        <div className="section-body section-info">
          <div className="section-body-content">
            <h1>Stęszew</h1>
            <div className="info">
              <p>ul. Gabriela Narutowicza 2</p>
              <p>Stęszew</p>
              <p>62-060</p>
            </div>
            <h2>Kontakt</h2>
            <div className="info">
              <p>kontakt@email.pl</p>
              <p>+48 881 418 887</p>
            </div>
          </div>
          <img
            className="map-location-image"
            src={MapLocation}
            alt="gym map location"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
