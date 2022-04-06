import axios, { AxiosResponse } from 'axios'

export const getTopStories = async (): Promise<AxiosResponse> => {
  return await axios.get(
    'https://hacker-news.firebaseio.com/v0/topstories.json'
  )
}

export const getStoryById = async (id: number): Promise<AxiosResponse> => {
  return await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  )
}

export const getUserById = async (userId: string): Promise<AxiosResponse> => {
  return await axios.get(
    `https://hacker-news.firebaseio.com/v0/user/${userId}.json`
  )
}
