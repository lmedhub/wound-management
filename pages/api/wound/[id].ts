import prisma from '../../../lib/prisma';

// DELETE /api/wound/:id
export default async function handle(req, res) {
  const woundId = req.query.id;
  if (req.method === 'DELETE') {
    const wound = await prisma.wound.delete({
      where: { id: woundId },
    });
    res.json(wound);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}