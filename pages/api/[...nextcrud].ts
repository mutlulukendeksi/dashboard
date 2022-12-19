import NextCrud, { PrismaAdapter } from '@premieroctet/next-crud'
import { Prisma, PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const prismaClient = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const nextCrudHandler = await NextCrud({
    adapter: new PrismaAdapter({
      prismaClient: prisma,
    }),
  })
  return nextCrudHandler(req, res)
}
export default handler