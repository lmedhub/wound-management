import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { options } from '../auth/[...nextauth]';

export default async function handle(req, res) {
  const { type, location, note } = req.body;
  const session = await getServerSession(req, res, options)

  if (session) {
    console.log(session)
    const result = await prisma.wound.create({
        data: {
          type: type,
          location: location,
          note: note,
          author: { connect: { email: session?.user?.email } },
        },
      });
      res.json(result);
  }
}