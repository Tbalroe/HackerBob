import React from 'react'
import '../styles/Card.scss'
import { CardDetail } from '../type'
import coolerbob from '../Coolerbob.png'
import bob from '../bob.jpg'

const CardComponent: React.FC<CardDetail> = ({
  authorId,
  score,
  timestamp,
  title,
  url,
  authorKarma,
  weCool
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <img src={weCool ? coolerbob : bob} alt="rover" />
      </div>
      <div className="card-body">
        <div>
          <div className="user">
            <div className="user-info">
              <small>Author</small>
              <h5>{authorId.toUpperCase()} </h5>
            </div>
          </div>
          <div className="user">
            <div className="user-info special">
              <small>Created at</small>
              <h5>{timestamp}</h5>
            </div>

            <div className="user-info">
              <small>Post Score</small>
              <h5>{score}</h5>
            </div>
            <div className="user-info">
              <small>Author Karma</small>
              <h5>{authorKarma}</h5>
            </div>
          </div>
          <h3>{title}</h3>
        </div>
        {url ? <a href={url}> Link to article</a> : <p>No url given by API</p>}
      </div>
    </div>
  )
}

export const Card = React.memo(CardComponent)
