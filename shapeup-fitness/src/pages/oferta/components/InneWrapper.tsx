import { useEffect, useState } from "react"

import { getInne } from "../../../firebase"

import { useDataContext, useSetDataContext } from "../../../contexts/DataContext"

import { OfferItem } from "../../../types"

import Loader from "../../../components/Loader"

export default function InneWrapper() {
  const [inne, setInne] = useState<OfferItem[] | null>(null)

  const dataContext = useDataContext()
  const setDataContext = useSetDataContext()

  useEffect(() => {
    if (dataContext.inne) return setInne(dataContext.inne)

    getInne()
      .then((v) => {
        setDataContext("inne", null, v, null, null, null)
        setInne(v)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <section>
      <div className="section-content">
        <div className="pricing-wrapper inne-pricing-wrapper">
          <div className="pricing-header">
            <h1>Inne</h1>
          </div>
          <div className="pricing-body">
            {inne ? (
              <>
                {inne.map((v) => (
                  <div key={v.name} className="pricing-item">
                    <h1>{v.name}</h1>
                    <h1>{v.price}zł</h1>
                  </div>
                ))}
              </>
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
