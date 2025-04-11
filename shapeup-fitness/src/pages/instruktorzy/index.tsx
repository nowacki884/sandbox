import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaBottom from "../../components/MetaBottom"
import Newsletter from "../../components/Newsletter"

import InstructorWrapper from "./components/InstructorWrapper"

export default function Instruktorzy() {
  return (
    <>
      <Header />
      <main className="page instruktorzy-page">
        <InstructorWrapper />
      </main>
      <Newsletter />
      <Footer />
      <MetaBottom />
    </>
  )
}
