import { Button,Box } from "@chakra-ui/button";

export default function DeleteButton(props){
    const {id, table, status} = props

    const onClickFunc = ()=>{
        if(status==="APPROVED"){
            fetch(fetch("/api/sender",{method: "post",body:JSON.stringify(({changes:[{type:"DELETE",table,authorId:1,row_id:id}]}))}))
        }
    }

    return(
        <Box>
            <Button onClick={onClickFunc} col="red">Delete</Button>
        </Box>
    )
}