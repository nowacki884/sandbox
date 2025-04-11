import { useEffect, useState } from "react"

import { getTreningiDwieOsoby, getTreningiJednaOsoba } from "../../../firebase"

import { useDataContext, useSetDataContext } from "../../../contexts/DataContext"

import { OfferItem } from "../../../types"

import Loader from "../../../components/Loader"

export default function TreningiWrapper() {
  const [treningiJednaOsoba, setTreningiJednaOsoba] = useState<OfferItem[] | null>(null)
  const [treningiDwieOsoby, setTreningiDwieOsoby] = useState<OfferItem[] | null>(null)

  const dataContext = useDataContext()
  const setDataContext = useSetDataContext()

  useEffect(() => {
    if (dataContext.treningiJ) {
      setTreningiJednaOsoba(dataContext.treningiJ)
    } else {
      getTreningiJednaOsoba()
        .then((v) => {
          setDataContext("treningiJ", null, v, null, null, null)
          setTreningiJednaOsoba(v)
        })
        .catch((err) => console.log(err))
    }

    if (dataContext.treningiD) {
      setTreningiDwieOsoby(dataContext.treningiD)
    } else {
      getTreningiDwieOsoby()
        .then((v) => {
          setDataContext("treningiD", null, v, null, null, null)
          setTreningiDwieOsoby(v)
        })
        .catch((err) => console.log(err))
    }
  }, [])

  return (
    <section>
      <div className="section-content">
        <div className="pricing-wrapper treningi-pricing-wrapper">
          <div className="pricing-header">
            <h1>Treningi personalne</h1>
          </div>
          <div className="pricing-body">
            <div className="pricing-category">
              <div className="pricing-header">
                <h1>1 osoba</h1>
              </div>
              {treningiJednaOsoba ? (
                treningiJednaOsoba.map((t, _) => (
                  <div key={t.name} className="pricing-item">
                    <h1>
                      {t.name} - {t.price}zł
                    </h1>
                  </div>
                ))
              ) : (
                <Loader />
              )}
            </div>
            <div className="pricing-category">
              <div className="pricing-header">
                <h1>2 osoby</h1>
              </div>
              {treningiDwieOsoby ? (
                treningiDwieOsoby.map((t, _) => (
                  <div key={t.name} className="pricing-item">
                    <h1>
                      {t.name} - {t.price}zł
                    </h1>
                  </div>
                ))
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="pricing-footer">
            <button className="big-button">Zapisz się &gt;</button>
          </div>
        </div>
      </div>
    </section>
  )
}
