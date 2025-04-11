import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { NewsArticle } from "../../types"

import { useDataContext } from "../../contexts/DataContext"

import Footer from "../../components/Footer"
import Header from "../../components/Header"
import MetaBottom from "../../components/MetaBottom"
import Newsletter from "../../components/Newsletter"

import ArticleContent from "./components/ArticleContent"

export default function Article() {
  const [articleData, setArticleData] = useState<NewsArticle>()

  const dataContext = useDataContext()
  const params = useParams()
  const navigateFn = useNavigate()

  useEffect(() => {
    const articleId: string | undefined = params.id

    if (!articleId) {
      navigateFn("/aktualnosci")
      return
    }

    const savedArticleData: NewsArticle | undefined = dataContext.aktualnosci?.filter(
      (v) => v.id === articleId
    )[0]

    if (!savedArticleData) {
      navigateFn("/aktualnosci")
      return
    }

    setArticleData(savedArticleData)
  }, [])

  return (
    <>
      <Header />
      <main className="page article-page">
        {articleData && <ArticleContent {...articleData} />}
      </main>
      <Newsletter />
      <Footer />
      <MetaBottom />
    </>
  )
}
