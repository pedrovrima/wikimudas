import prisma from "../../lib/prisms"


// Create a generic function that gets data + spp_id and creates

// create a switch that gets ChangeType and returns a child/table object

export default async function send_data(req, res) {
  const data = JSON.parse(req.body);
  console.log(data);
  // run this for all changesb
  await data.changes.map(async (chang) => {
    // create changelog
    const changeL = await prisma.changeLogs.create({
      data: { ...chang.data }
    });

    if (chang.data.type === "CREATE" || chang.data.type === "UPDATE") {
      const created = await prisma[chang.data.table].create({
        data: { ...chang.datatable, changeId: changeL.id }
      });
      await prisma.changeLogs.update({
        where: { id: changeL.id },
        data: { row_id: created.id }
      });
    }
  });
  res.send(200);
}

const solve_change = async (req, res) => {
  const data = prisma.changeLogs.update({
    where: { id: req.changeId },
    data: { status: req.status, editorId: req.editorId }
  });
  if (req.status === "APPROVED") {
    if (data.type === "DELETE") {
      prisma[data.table].update({
        where: { id: data.row_id },
        data: { isDeleted: true }
      });
    }
    if (data.type === "UPDATE") {
      const up = prisma[data.table].findUnique({
        where: { id: data.row_id }
      });
      prisma[data.table].update({
        where: { id: up.oldId },
        data: { isDeleted: true }
      });
    }
  }
};

const getData = async (req, res) => {
  prisma.changeLogs.findMany({
    where: { status: "PENDING" },
    include: {
      molts: { include: { species: true } },
      reference: { include: { species: true } },
      family: { include: { species: true } },
      species: { include: { species: true } },
      strategy: { include: { species: true } },
      skull: { include: { species: true } },
      moltLimits: { include: { species: true } },
      sex: { include: { species: true } },
      ages: { include: { species: true } }
    }
  });
};

const whereAccepted = {
  where: { changeLog: { status: "APPROVED" }, isDeleted: false }
};

const getApprovedSpecies = async (req, res) => {
  prisma.species.findUnique({
    where: { id: req.id },
    include: {
      molts: { ...whereAccepted, include: { reference: true } },
      family: { ...whereAccepted, include: { reference: true } },
      strategy: { ...whereAccepted, include: { reference: true } },
      skull: { ...whereAccepted, include: { reference: true } },
      moltLimits: { ...whereAccepted, include: { reference: true } },
      ages: {
        ...whereAccepted,
        include: { sex: { ...whereAccepted }, include: { reference: true } }
      }
    }
  });
};

