import { useEffect, useState } from "react"

import { getKarnety } from "../../../firebase"

import { useDataContext, useSetDataContext } from "../../../contexts/DataContext"

import { OfferItem } from "../../../types"

import Loader from "../../../components/Loader"

export default function KarnetyWrapper() {
  const [karnety, setKarnety] = useState<OfferItem[] | null>(null)

  const dataContext = useDataContext()
  const setDataContext = useSetDataContext()

  useEffect(() => {
    if (dataContext.karnety) return setKarnety(dataContext.karnety)

    getKarnety()
      .then((v) => {
        setDataContext("karnety", null, v, null, null, null)
        setKarnety(v)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <section>
      <div className="section-content">
        <div className="pricing-wrapper karnety-pricing-wrapper">
          <div className="pricing-header">
            <h1>Karnety</h1>
          </div>
          <div className="pricing-body">
            {karnety ? (
              karnety.map((karnet, _) => (
                <div key={karnet.name} className="pricing-item">
                  <div className="pricing-item-body">
                    <h1>{karnet.name}</h1>
                    <h1>{karnet.price}zł</h1>
                  </div>
                  <div className="pricing-body-footer">
                    <button className="big-button">Wykup &gt;</button>
                  </div>
                </div>
              ))
            ) : (
              <section className="full">
                <Loader />
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
