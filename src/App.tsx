import React, { useEffect, useState } from 'react'
import './styles/App.scss'
import {
  getTopStories,
  getStoryById,
  getUserById
} from './api/hackerNewsService'
import { mapCardDetails, sortByScore, tenRandomNumbers } from './utils'
import { Author, CardDetail, Story } from './type'
import { Card } from './components/Card'

const App: React.FC = () => {
  const [topStories, setTopStories] = useState<number[]>([])
  const [randomStories, setRandomStories] = useState<Story[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [cardDetails, setCardDetails] = useState<CardDetail[]>([])
  const [weCool, setWeCool] = useState<boolean>(false)

  useEffect(() => {
    getTopStories()
      .then((topStories) => setTopStories(topStories.data))
      .catch((error) => {
        console.log('Could not get top stories: ' + error)
      })
  }, [])

  useEffect(() => {
    if (topStories.length > 10) {
      const storiesToFetch: number[] = tenRandomNumbers(topStories)

      Promise.all(
        storiesToFetch.map((storyId) =>
          getStoryById(storyId).then((story) => story.data)
        )
      )
        .then((stories) => setRandomStories(sortByScore(stories)))
        .catch((error) => {
          console.log('Could not get stories: ' + error)
        })
    }
  }, [topStories])

  useEffect(() => {
    if (randomStories.length > 0) {
      Promise.all(
        randomStories.map((story) =>
          getUserById(story.by).then((author) => author.data)
        )
      )
        .then((authors) => setAuthors(authors))
        .catch((error) => {
          console.log('Could not get authors: ' + error)
        })
    }
  }, [randomStories])

  useEffect(() => {
    if (authors.length > 0) {
      setCardDetails(mapCardDetails(randomStories, authors))
    }
  }, [authors])

  const changeCoolness = (): void => {
    setWeCool(!weCool)
    if (!weCool) {
      document.body.style.background = 'rgb(63, 94, 251)'
      document.body.style.background =
        'radial-gradient(circle,rgba(63, 94, 251, 1) 0%,rgba(252, 70, 107, 1) 100%)'
    } else {
      document.body.style.background = 'antiquewhite'
    }
  }

  return (
    <div className="wrapper">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          className="button"
          style={
            weCool
              ? {
                  backgroundImage:
                    'linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)'
                }
              : { backgroundColor: '#6B9DAA' }
          }
          onClick={() => changeCoolness()}
        >
          {weCool ? 'Turn off eye-candy' : 'Turn on eye-candy'}
        </button>
      </div>

      <div className="container">
        {cardDetails.map((card, index) => (
          <Card
            authorId={card.authorId}
            timestamp={card.timestamp}
            score={card.score}
            title={card.title}
            url={card.url}
            authorKarma={card.authorKarma}
            key={index}
            weCool={weCool}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(App)
