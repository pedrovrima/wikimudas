export default async function delete_data(req, res) {
    const data = JSON.parse(req.body);
    console.log(data);
    // run this for all changesb
    await data.changes.map(async (chang) => {
      // create changelog
      const changeL = await prisma.deleteLogs.create({
        data: { ...chang.data , [chang.data.table]:{connect:{id:chang.data.row_id}}}
      });
    });
    res.send(200);
  }