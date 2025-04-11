import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaBottom from "../../components/MetaBottom"
import Newsletter from "../../components/Newsletter"

import InneWrapper from "./components/InneWrapper"
import KarnetyWrapper from "./components/KarnetyWrapper"
import TreningiWrapper from "./components/TreningiWrapper"

export default function Oferta() {
  return (
    <>
      <Header />
      <main className="page oferta-page">
        <KarnetyWrapper />
        <TreningiWrapper />
        <InneWrapper />
      </main>
      <Newsletter />
      <Footer />
      <MetaBottom />
    </>
  )
}
