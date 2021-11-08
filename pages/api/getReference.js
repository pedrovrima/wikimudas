import prisma from "../../lib/prisms"


// Create a generic function that gets data + spp_id and creates

// create a switch that gets ChangeType and returns a child/table object

export default async function references(req, res) {
    const references = await prisma.reference.findMany({where:{changelog: { status: "APPROVED" }}})
    res.send(references)
}