import { ChangeEvent, FormEvent, useState } from "react"

export default function Newsletter() {
  const [inputValue, setInputValue] = useState<string>("")

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value)
    console.log(e.target.value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    console.log(inputValue)
  }

  return (
    <section className="light newsletter-wrapper">
      <div className="section-content">
        <div className="section-header">
          <h1>BĄDŹ NA BIEŻĄCO</h1>
        </div>
        <div className="section-footer section-break">
          <p>
            Zapisz się, aby być pierwszym z informacją o nowościach, promocjach, akcjach i
            wydarzeniach w naszej siłowni!
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Adres e-mail"
              defaultValue={inputValue}
              name="e-mail"
              onChange={handleChange}
            />
            <button type="submit" className="big-button">
              Zapisz się
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
