import type { NextApiRequest, NextApiResponse } from 'next'
import type { Comment, Post } from '../interfaces'
import redis from './redis'
import { nanoid } from 'nanoid'
import getUser from './getUser'
import clearUrl from './clearUrl'

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = clearUrl(req.headers.referer)
  const { text } = req.body.text
  const { image } = req.body.image
  const { authorization } = req.headers

  if (!text || !authorization) {
    return res.status(400).json({ message: 'Missing parameter.' })
  }

  if (!redis) {
    return res
      .status(400)
      .json({ message: 'Failed to connect to redis client.' })
  }

  try {
    // verify user token  
    const user = await getUser(authorization)
    if (!user) return res.status(400).json({ message: 'Need authorization.' })

    const post: Post = {
      id: nanoid(),
      slug: req.body.slug,
      imageURL: req.body.imageURL, 
      title: req.body.title,
      author: req.body.author,
      date: new Date(Date.now()),
      content: req.body.content,
      excerpt: req.body.excerpt,
    }
    // write data
    await redis.zadd("posts", JSON.stringify(post))

    return res.status(200).json(post)
  } catch (_) {
    return res.status(400).json({ message: 'Unexpected error occurred.' })
  }
}
