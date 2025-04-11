import { Link } from "react-router-dom"

import CloudImage from "../../../components/CloudImage"

import { NewsArticle } from "../../../types"

export default function ArticleContent(props: NewsArticle) {
  return (
    <section>
      <div className="section-content">
        <div className="section-header">
          <Link to="/aktualnosci">&lt; Wstecz</Link>
        </div>
        <article>
          <div className="article-title">
            <h1>{props.title}</h1>
            <h2>{props.date.toDate().toLocaleDateString()}</h2>
          </div>
          <CloudImage imageUrl={props.imageId} />
          {props.desc?.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </article>
      </div>
    </section>
  )
}
