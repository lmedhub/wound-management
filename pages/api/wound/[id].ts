import { getServerSession } from 'next-auth';
import prisma from '../../../lib/prisma';
import { options } from '../auth/[...nextauth]';

export default async function handle(req, res) {
  const woundId = req.query.id;
  if (req.method === 'DELETE') {
    const wound = await prisma.wound.delete({
      where: { id: woundId },
    });
    res.json(wound);
  } else if (req.method === 'PUT') {
    const { type, location, note} = req.body;
    const session = await getServerSession(req, res, options)
    if (session) {

    const result = await prisma.wound.update({
      where: { id: woundId },
      data: { type: type, location: location, note: note },
    });
    res.json(result);
  }
  }
  else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}

