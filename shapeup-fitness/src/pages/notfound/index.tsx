import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/")
  }, [])

  return <div className="page note-found-page">what da hellllll</div>
}
