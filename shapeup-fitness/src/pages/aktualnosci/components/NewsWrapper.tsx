import { useEffect, useState } from "react"

import { NewsArticle } from "../../../types"

import { useDataContext, useSetDataContext } from "../../../contexts/DataContext"

import { getNewsArticles } from "../../../firebase"

import Loader from "../../../components/Loader"

import Article from "./Article"

export default function NewsWrapper() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[] | null>(null)

  const dataContext = useDataContext()
  const setDataContext = useSetDataContext()

  useEffect(() => {
    if (dataContext.aktualnosci) return setNewsArticles(dataContext.aktualnosci)

    getNewsArticles()
      .then((articles) => {
        setDataContext("aktualnosci", null, null, articles, null, null)
        setNewsArticles(articles)
      })
      .catch((err) => console.log(err))
  }, [dataContext])

  return (
    <section>
      <div className="section-content">
        <div className="section-header">
          <h1>Aktualności</h1>
        </div>
        <div className="section-body">
          <div className="article-wrapper">
            {newsArticles ? (
              newsArticles.map((article, _) => <Article key={article.id} {...article} />)
            ) : (
              <section className="full">
                <Loader />
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
