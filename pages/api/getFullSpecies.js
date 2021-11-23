import prisma from "../../lib/prisms";

const notDeleted = { where:{OR:[{deleteLogsId:null}, { deleteLogs: {status:{not:"APPROVED"}} } ]}};

export default async function  getFullSpp(req, res) {
  const spp = await prisma.species.findUnique({
    where: { id: 1 },
    include: {
      molts: { ...notDeleted, include: { changelog:true,deleteLogs:true, reference: true } },
      strategy: { ...notDeleted, include: { changelog:true,deleteLogs:true, reference: true } },
      skull: { ...notDeleted, include: { changelog:true,deleteLogs:true, reference: true } },
      moltLimits: { ...notDeleted, include: { molt_limit:true,changelog:true,deleteLogs:true, reference: true } },
      ages: {
        ...notDeleted,
        include: {
          age:true,
          sex: {
            ...notDeleted,
            include: { changelog:true,deleteLogs:true, reference: true, ageSexTraits: {include:{tract:true,changelog:true,deleteLogs:true, reference: true}} }
          },
          changelog:true,deleteLogs:true, reference: true 
        }
      }
    }
  });

  res.send(spp);
}
