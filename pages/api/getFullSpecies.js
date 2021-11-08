import prisma from "../../lib/prisms";

const notDeleted = { where: { isDeleted: false } };

export default async function  getFullSpp(req, res) {
  const spp = await prisma.species.findUnique({
    where: { id: 1 },
    include: {
      molts: { ...notDeleted, include: { changelog:true, reference: true } },
      strategy: { ...notDeleted, include: { changelog:true, reference: true } },
      skull: { ...notDeleted, include: { changelog:true, reference: true } },
      moltLimits: { ...notDeleted, include: { molt_limit:true,changelog:true, reference: true } },
      ages: {
        ...notDeleted,
        include: {
          sex: {
            ...notDeleted,
            include: { changelog:true, reference: true, ageSexTraits: {} }
          },
          changelog:true, reference: true 
        }
      }
    }
  });

  console.log(spp.molts)
  res.send(spp);
}
