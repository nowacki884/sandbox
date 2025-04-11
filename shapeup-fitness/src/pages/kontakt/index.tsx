import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaBottom from "../../components/MetaBottom"
import Newsletter from "../../components/Newsletter"

import ContactInfo from "./components/ContactInfo"

export default function Kontakt() {
  return (
    <>
      <Header />
      <main className="page kontakt-page">
        <ContactInfo />
      </main>
      <Newsletter />
      <Footer />
      <MetaBottom />
    </>
  )
}
