import { Heading, Box, Text, Flex } from "@chakra-ui/react";
import { useEffect } from "react"
import useSWR from "swr"
import MoltLimit from "../components/moltlimits_form"
import MoltForm from "../components/molts_form"
import RefPop from "../components/reference-popover"
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SpeciesFrom (props){
const {data:reference,error:ref_error} = useSWR('api/getReference',fetcher)
const {data:species_data,error:species_error} = useSWR('api/getFullSpecies',fetcher)

    return(
<Box>
    {species_data?
    <Box>
    <Heading>{`${species_data.genus} ${species_data.species}`}</Heading>
    
  

    {reference?
<Box>
<Box>

<Heading size="md">Limite de Muda</Heading>    
{species_data.moltLimits.map((ml,i)=><Flex align="center" key={i}>
    <Text  color={ml.changelog.status==="APPROVED"?"green":"yellow"}>{ml.molt_limit.pt_name}</Text><RefPop title={ml.reference.title} authors={ml.reference.authors}></RefPop>
    </Flex>
    )}
<MoltLimit references={reference}></MoltLimit>
</Box>


<Box>

<Heading size="md">Molt Strategies</Heading>    
{species_data.molts.map((ml,i)=><Flex align="center" key={i}>
    <Text  color={ml.changelog.status==="APPROVED"?"green":"yellow"}>{`${ml.name}: ${ml.extension}`}</Text><RefPop title={ml.reference.title} authors={ml.reference.authors}></RefPop>
    </Flex>
    )}
<MoltForm references={reference}></MoltForm>
</Box>
</Box>

:"loading"}  </Box> : "loading"}
</Box>
    )

}