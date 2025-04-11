import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Opinion1 from "../../../assets/opinions/opinia-1.jpg"
import Opinion2 from "../../../assets/opinions/opinia-2.jpg"
import Opinion3 from "../../../assets/opinions/opinia-3.jpg"
import Opinion4 from "../../../assets/opinions/opinia-4.jpg"

export default function Opinions() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0)
  const [opinionOnePosition, setOpinionOnePosition] = useState<string>("front")
  const [opinionTwoPosition, setOpinionTwoPosition] = useState<string>("right")
  const [opinionThreePosition, setOpinionThreePosition] = useState<string>("back")
  const [opinionFourPosition, setOpinionFourPosition] = useState<string>("left")
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false)

  function setOrder(index: number): void {
    if (index === 0) {
      setOpinionOnePosition("front")
      setOpinionTwoPosition("right")
      setOpinionThreePosition("back")
      setOpinionFourPosition("left")
    } else if (index === 1) {
      setOpinionOnePosition("left")
      setOpinionTwoPosition("front")
      setOpinionThreePosition("right")
      setOpinionFourPosition("back")
    } else if (index === 2) {
      setOpinionOnePosition("back")
      setOpinionTwoPosition("left")
      setOpinionThreePosition("front")
      setOpinionFourPosition("right")
    } else if (index === 3) {
      setOpinionOnePosition("right")
      setOpinionTwoPosition("back")
      setOpinionThreePosition("left")
      setOpinionFourPosition("front")
    }
  }

  function pickSlide(nextOrPrev: boolean): void {
    let n: number

    if (nextOrPrev) {
      n = activeCardIndex + 1
    } else {
      n = activeCardIndex - 1
    }

    const nextIndex: number = n % 4

    setOrder(nextIndex >= 0 ? nextIndex : nextIndex + 4)

    setActiveCardIndex(nextIndex)

    setButtonsDisabled(true)

    setTimeout(() => {
      setButtonsDisabled(false)
    }, 500)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      pickSlide(true)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [activeCardIndex])

  return (
    <section className="light full opinion-section">
      <div className="section-content">
        <div className="section-header">
          <h1>OPINIE</h1>
        </div>
        <div className="section-body">
          <button disabled={buttonsDisabled} onClick={() => pickSlide(false)}>
            <h1>&lt;</h1>
          </button>
          <div className="opinion-wrapper">
            <img
              className={`opinion-card opinion-card-${opinionOnePosition}`}
              src={Opinion1}
              alt="opinion 1"
              loading="lazy"
            />
            <img
              className={`opinion-card opinion-card-${opinionTwoPosition}`}
              src={Opinion2}
              alt="opinion 2"
              loading="lazy"
            />
            <img
              className={`opinion-card opinion-card-${opinionThreePosition}`}
              src={Opinion3}
              alt="opinion 3"
              loading="lazy"
            />
            <img
              className={`opinion-card opinion-card-${opinionFourPosition}`}
              src={Opinion4}
              alt="opinion 4"
              loading="lazy"
            />
          </div>
          <button disabled={buttonsDisabled} onClick={() => pickSlide(true)}>
            <h1>&gt;</h1>
          </button>
        </div>
        <div className="section-footer">
          <Link to="/oferta" className="big-button">
            Zobacz ofertę &gt;
          </Link>
        </div>
      </div>
    </section>
  )
}
