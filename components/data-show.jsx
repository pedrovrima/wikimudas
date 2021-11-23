import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import DeleteButton from "./delete_button";
import RefPop from "./reference-popover";

export default function  showData(props){
    console.log(props)
    const {data, mutate, table,text,key}=props
    
    return(
    <Flex align="center" key={i}>
    <Text
      color={
        data.changelog.status === "APPROVED"
          ? "green"
          : "yellow"
      }
    >{text}</Text>
    <RefPop
      title={data.reference.title}
      authors={data.reference.authors}
    />
                            {                              data.deleteLogs?.status!=="PENDING"        &&                    data.changelog.status === "APPROVED"?

<DeleteButton id={data.id} table={table} status={data.changelog.status} mutate={mutate}/>:""}

  </Flex>)

}