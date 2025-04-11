import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaBottom from "../../components/MetaBottom"
import Newsletter from "../../components/Newsletter"

import NewsWrapper from "./components/NewsWrapper"

export default function Aktualnosci() {
  return (
    <>
      <Header />
      <main className="page aktualnosci-page">
        <NewsWrapper />
      </main>
      <Newsletter />
      <Footer />
      <MetaBottom />
    </>
  )
}
