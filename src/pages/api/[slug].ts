import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    res.statusCode = 400;

    return res.send({ message: 'Slug is missing' });
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) {
    res.statusCode = 404;

    return res.send({ message: 'Short link does not exist.' });
  }

  return res.redirect(data.url);
};
