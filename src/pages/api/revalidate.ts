import Cors from 'cors'
import { NextApiRequest, NextApiResponse } from 'next'

import { REVALIDATE_SECRET } from '@/shared/const'

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
})

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<any> {
  await runMiddleware(req, res, cors)
  if (req.query.secret !== REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  try {
    await res.revalidate('/')

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
