import { notion } from 'lib/front/notion'
import { NextApiRequest, NextApiResponse } from 'next'

import * as types from 'types'

const searchNotion = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const searchParams: types.SearchParams = req.body
  const results = await notion.search(searchParams)

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  res.status(200).json(results)
}

export default searchNotion
