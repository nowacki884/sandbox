import Instructor1 from "../../../assets/people/instructor-1.png"
import Instructor2 from "../../../assets/people/instructor-2.png"
import Instructor3 from "../../../assets/people/instructor-3.png"

export default function InstructorWrapper() {
  return (
    <section>
      <div className="section-content">
        <div className="section-body">
          <div className="instructor-wrapper">
            <div className="instructor-card" style={{ backgroundImage: `url(${Instructor1})` }}>
              <div className="instructor-card-overlay">
                <h1 className="instructor-card-header">Marcin</h1>
                <h3 className="instructor-card-desc">Turbo spalanie, Trening obwodowy</h3>
              </div>
            </div>
            <div className="instructor-card" style={{ backgroundImage: `url(${Instructor2})` }}>
              <div className="instructor-card-overlay">
                <h1 className="instructor-card-header">Kasia</h1>
                <h3 className="instructor-card-desc">Yoga</h3>
              </div>
            </div>
            <div className="instructor-card" style={{ backgroundImage: `url(${Instructor3})` }}>
              <div className="instructor-card-overlay">
                <h1 className="instructor-card-header">Angelika</h1>
                <h3 className="instructor-card-desc">Boks</h3>
              </div>
            </div>
            <div className="instructor-card" style={{ backgroundImage: `url(${Instructor1})` }}>
              <div className="instructor-card-overlay">
                <h1 className="instructor-card-header">Mikołaj</h1>
                <h3 className="instructor-card-desc">Zdrowy kręgosłup</h3>
              </div>
            </div>
            <div className="instructor-card" style={{ backgroundImage: `url(${Instructor2})` }}>
              <div className="instructor-card-overlay">
                <h1 className="instructor-card-header">Daria</h1>
                <h3 className="instructor-card-desc">ABT, Pilates</h3>
              </div>
            </div>
            <div className="instructor-card" style={{ backgroundImage: `url(${Instructor3})` }}>
              <div className="instructor-card-overlay">
                <h1 className="instructor-card-header">Ania</h1>
                <h3 className="instructor-card-desc">Zdrofit</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
