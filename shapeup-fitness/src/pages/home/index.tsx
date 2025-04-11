import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaBottom from "../../components/MetaBottom"
import Newsletter from "../../components/Newsletter"

import Cards from "./components/Cards"
import Hero from "./components/Hero"
import Info from "./components/Info"
import Opinions from "./components/Opinions"

export default function Home() {
  return (
    <>
      <Header />
      <main className="page home-page">
        <Hero />
        <Cards />
        <Opinions />
        <Info />
      </main>
      <Newsletter />
      <Footer />
      <MetaBottom />
    </>
  )
}
