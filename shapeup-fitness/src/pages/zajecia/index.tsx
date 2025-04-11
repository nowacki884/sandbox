import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaBottom from "../../components/MetaBottom"
import Newsletter from "../../components/Newsletter"

import ScheduleWrapper from "./components/ScheduleWrapper"

export default function Zajecia() {
  return (
    <>
      <Header />
      <main className="page zajecia-page">
        <ScheduleWrapper />
      </main>
      <Newsletter />
      <Footer />
      <MetaBottom />
    </>
  )
}
