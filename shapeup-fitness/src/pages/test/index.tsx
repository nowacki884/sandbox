import { Link } from "react-router-dom"
import TestButton from "../../components/TestButton"
import CloudImage from "../../components/CloudImage"

export default function Test() {
  return (
    <section className="full">
      <div className="section-content">
        <Link to="/">&lt; Home</Link>
        <h1>Test</h1>
        <TestButton />
        <CloudImage imageUrl="263dbb12-b938-4d69-a794-411335c8b05b_vziv6f" />
      </div>
    </section>
  )
}
