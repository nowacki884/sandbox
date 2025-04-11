import { Link } from "react-router-dom"

import { NewsArticle } from "../../../types"

import CloudImage from "../../../components/CloudImage"

export default function Article(props: NewsArticle) {
  return (
    <article>
      <div className="article-thumbnail">
        <Link to={`/aktualnosci/${props.id}`}>
          <CloudImage imageUrl={`${props.imageId}`} />
        </Link>
      </div>
      <div className="article-data">
        <div className="article-title">
          <h1>{props.title}</h1>
          <h2>{props.date.toDate().toLocaleDateString()}</h2>
        </div>
        <div className="article-desc">
          {props.desc && (
            <>
              <p>{props.desc[0]}</p>
              {props.desc[1] && <p>...</p>}
            </>
          )}
        </div>
        <div className="article-footer">
          <Link to={`/aktualnosci/${props.id}`} className="big-button">
            Czytaj dalej &gt;
          </Link>
        </div>
      </div>
    </article>
  )
}
