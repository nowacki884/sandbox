import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

import Aktualnosci from "./pages/aktualnosci"
import Article from "./pages/article"
import Home from "./pages/home"
import Instruktorzy from "./pages/instruktorzy"
import Kontakt from "./pages/kontakt"
import Login from "./pages/login"
import NotFound from "./pages/notfound"
import Odzyskiwanie from "./pages/odzyskiwanie"
import Oferta from "./pages/oferta"
import Profil from "./pages/profil"
import Register from "./pages/register"
import SprawdzID from "./pages/sprawdz-id"
import Sprawdz from "./pages/sprwadz"
import Test from "./pages/test"
import Zajecia from "./pages/zajecia"

import DataProvider from "./contexts/DataContext"
import UserProvider from "./contexts/UserContext"

export default function App() {
  return (
    <UserProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/zajecia" element={<Zajecia />} />
            <Route path="/instruktorzy" element={<Instruktorzy />} />
            <Route
              path="/aktualnosci/*"
              element={
                <Routes>
                  <Route index element={<Aktualnosci />} />
                  <Route path="/:id" element={<Article />} />
                </Routes>
              }
            />
            <Route path="/oferta" element={<Oferta />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/zaloguj" element={<Login />} />
            <Route path="/zarejestruj" element={<Register />} />
            <Route path="/odzyskiwanie" element={<Odzyskiwanie />} />
            <Route path="/profil" element={<Profil />} />
            <Route
              path="/sprawdz/*"
              element={
                <Routes>
                  <Route index element={<Sprawdz />} />
                  <Route path="/:id" element={<SprawdzID />} />
                </Routes>
              }
            />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </DataProvider>
    </UserProvider>
  )
}
