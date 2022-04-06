import { Author, CardDetail, Story } from './type'

export const tenRandomNumbers = (arrayOfTopStories: number[]): number[] => {
  const arrayOfRandomTopStoryIndices: number[] = []

  do {
    const addToArray = Math.floor(Math.random() * arrayOfTopStories.length + 1)
    if (!arrayOfRandomTopStoryIndices.includes(arrayOfTopStories[addToArray])) {
      arrayOfRandomTopStoryIndices.push(arrayOfTopStories[addToArray])
    }
  } while (arrayOfRandomTopStoryIndices.length < 10)

  return arrayOfRandomTopStoryIndices
}

export const sortByScore = (stories: Story[]): Story[] => {
  return stories.sort((a, b) => b.score - a.score)
}

export const mapCardDetails = (
  stories: Story[],
  authors: Author[]
): CardDetail[] => {
  const cardDetails: CardDetail[] = stories.map((story) => {
    const author = authors.find((author) => author.id === story.by)
    return {
      authorId: story.by,
      authorKarma: author?.karma,
      score: story.score,
      timestamp: story.time,
      title: story.title,
      url: story.url
    }
  })

  return cardDetails
}
