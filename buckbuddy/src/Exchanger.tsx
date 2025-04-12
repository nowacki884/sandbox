import { ChangeEvent, useRef, useState } from "react"

import {
  Currency,
  getAllCurrencyCodes,
  getCurrencyDataByCode,
  getCurrencyNameByCode,
} from "./currencies"

export default function Exchanger() {
  const [currency1Code, setCurrency1Code] = useState<string>("USD")
  const [currency2Code, setCurrency2Code] = useState<string>("PLN")
  const [convertedAmount, setConvertedAmount] = useState<number>()

  const amountRef = useRef<HTMLInputElement>(null)

  function handleCurrencyChange(n: number, e: ChangeEvent<HTMLSelectElement>): void {
    setConvertedAmount(undefined)
    const selectVal: string = e.target.value

    switch (n) {
      case 1:
        if (selectVal === currency2Code) {
          setCurrency2Code(currency1Code)
          setCurrency1Code(selectVal)
        } else {
          setCurrency1Code(selectVal)
        }
        break
      case 2:
        if (selectVal === currency1Code) {
          setCurrency1Code(currency2Code)
          setCurrency2Code(selectVal)
        } else {
          setCurrency2Code(selectVal)
        }
        break
      default:
        break
    }
  }

  async function getData(): Promise<void> {
    const secondCurrencyData: Currency | undefined = getCurrencyDataByCode(currency2Code)
    if (!secondCurrencyData || !amountRef.current?.value) return

    const fetchedData = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${
        import.meta.env.VITE_API_KEY
      }&base_currency=${currency1Code}&currencies=${currency2Code}`,
      {
        method: "GET",
      }
    )

    if (fetchedData.ok) {
      const data = await fetchedData.json()
      const conversionRate = Object.values(data.data)[0] as number
      const converted: string = (parseFloat(amountRef.current.value) * conversionRate).toFixed(
        secondCurrencyData.decimal_digits
      )
      setConvertedAmount(parseFloat(converted))
    } else {
      console.error(fetchedData.status)
    }
  }

  return (
    <div className="exchanger-wrapper">
      <div className="currency-picker-wrapper">
        <div className="currency-picker-header">
          <h2>{getCurrencyNameByCode(currency1Code)}</h2>
        </div>
        <div className="currency-picker-body">
          <select
            name="currency1"
            value={currency1Code}
            onChange={(e) => handleCurrencyChange(1, e)}
          >
            {getAllCurrencyCodes().map((v) => (
              <option key={v} value={v} label={v} />
            ))}
          </select>
          <input
            type="number"
            ref={amountRef}
            defaultValue={1}
            name="amount1"
            autoComplete="false"
          />
        </div>
      </div>
      <button onClick={getData}>GO</button>
      <div className="currency-picker-wrapper">
        <div className="currency-picker-header">
          <h2>{getCurrencyNameByCode(currency2Code)}</h2>
        </div>
        <div className="currency-picker-body">
          <select
            name="currency2"
            value={currency2Code}
            onChange={(e) => handleCurrencyChange(2, e)}
          >
            {getAllCurrencyCodes().map((v) => (
              <option key={v} value={v} label={v} />
            ))}
          </select>
          {convertedAmount && <p>{convertedAmount}</p>}
        </div>
      </div>
    </div>
  )
}
