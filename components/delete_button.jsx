import { Button, Box } from "@chakra-ui/react";

export default function DeleteButton(props) {
  const { id, table, status, mutate } = props;

  const onClickFunc = async () => {
       await fetch("/api/delete_record", {
          method: "post",
          body: JSON.stringify({
            changes: [{data:{  table, authorId: 1, row_id: id }}]
          })
        })
      mutate()
  };
  return (
    <div>
      <Box>
        <Button onClick={onClickFunc} bg="red">
          Delete
        </Button>
      </Box>
    </div>
  );
}
