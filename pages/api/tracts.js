import prisma from "../../lib/prisms"


// Create a generic function that gets data + spp_id and creates

// create a switch that gets ChangeType and returns a child/table object

export default async function molt_limits(req, res) {
    const mls = await prisma.tracts.findMany()
    console.log(mls)
    res.send(mls)
}