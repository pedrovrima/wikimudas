import { Heading, Box, Text, Flex, Container } from "@chakra-ui/react";
import { useEffect } from "react";
import useSWR from "swr";
import DeleteButton from "../components/delete_button";
import MoltLimit from "../components/moltlimits_form";
import MoltForm from "../components/molts_form";
import AgeForm from "../components/add-age";
import RefPop from "../components/reference-popover";
import StrategyForm from "../components/strategy_form";
import SexForm from "../components/sex_form";
import TractForm from "../components/tracts_form";
const fetcher = url => fetch(url).then(res => res.json());

const headerColor = data => {
  if (data.deleteLogs) {
    return "red";
  } else {
    if (data.changelog.status === "APPROVED") {
      return "green";
    } else {
      return "orange";
    }
  }
};

const ShowData = props => {
  const { data, mutate, table, text, key, size } = props;

  return (
    <Flex align="center" key={key}>
      <Text fontSize={size} color={headerColor(data)}>
        {text}
      </Text>
      <RefPop title={data.reference.title} authors={data.reference.authors} />
      {                              data.deleteLogs?.status!=="PENDING"        &&                    data.changelog.status === "APPROVED"?

<DeleteButton id={data.id} table={table} status={data.changelog.status} mutate={mutate}/>:""}
    </Flex>
  );
};

export default function SpeciesFrom(props) {
  const { data: reference, error: ref_error } = useSWR(
    "api/getReference",
    fetcher
  );
  const { data: species_data, error: species_error, mutate } = useSWR(
    "api/getFullSpecies",
    fetcher
  );

  return (
    <Box p={4} mx={16}>
      {species_data
        ? <Box>
            <Heading>{`${species_data.genus} ${species_data.species}`}</Heading>
            {reference
              ? <Box>
                  <Box>
                    <Heading size="md">Estratégia</Heading>
                    {species_data.strategy.map((ml, i) =>
                      <ShowData
                        data={ml}
                        table="strategy"
                        key={i}
                        mutate={mutate}
                        text={`${ml.strategy}`}
                      />
                    )}
                    <StrategyForm mutate={mutate} references={reference} />
                  </Box>

                  <Box>
                    <Heading size="md">Limite de Muda</Heading>
                    {species_data.moltLimits.map((ml, i) =>
                      <ShowData
                        data={ml}
                        table="moltLimits"
                        key={i}
                        mutate={mutate}
                        text={`${ml.molt_limit.pt_name}`}
                      />
                    )}
                    <MoltLimit mutate={mutate} references={reference} />
                  </Box>

                  <Box>
                    <Heading size="md">Molt Strategies</Heading>
                    {species_data.molts.map((ml, i) =>
                      <ShowData
                        data={ml}
                        table="molts"
                        key={i}
                        mutate={mutate}
                        text={`${ml.molt}: ${ml.extension}`}
                      />
                    )}
                    <MoltForm mutate={mutate} references={reference} />
                  </Box>
                  <Box>
                    <Heading size="md">Ages</Heading>
                    {species_data.ages.map((ag, i) =>
                      <ShowAge
                        age_data={ag}
                        key={i}
                        mutate={mutate}
                        references={reference}
                      />
                    )}
                  <AgeForm mutate={mutate} references={reference}></AgeForm>
                  </Box>
                </Box>
              : "loading"}{" "}
          </Box>
        : "loading"}
    </Box>
  );
}

const ShowAge = (props)=>{
 const {age_data, mutate, references} = props
    return(
<>
<ShowData
                        data={age_data}
                        table="ages"
                        mutate={mutate}
                        text={`${age_data.age.age_type}`}
                      />
<Box bg="lightGray" rounded={"12px"} p={12}>


{age_data.sex.map((sx,i)=>
  <ShowSex key={i} i={i} sex_data={sx} mutate={mutate} references={references}></ShowSex>

)
}
</Box>
<SexForm mutate={mutate} ageId={age_data.id} references={references}></SexForm>
</>


      )

}



const ShowSex = (props)=>{
  console.log(props)
  const {sex_data, mutate, references, i} = props
  return(
<>
<Box bg={i%2?"blue":"red"}  p={12}>

<ShowData
                      size={"lg"}
                      data={sex_data}
                      table="sex"
                      mutate={mutate}
                      text={`${sex_data.sex}`}
                    />

<Box   p={12}>

{sex_data.ageSexTraits.map((ag,i)=>{
  return(<ShowData
    key={i}
    data={ag}
    table="ageSexTraits"
    mutate={mutate}
    text={`${ag.tract.pt_name}: ${ag.characteristics}`}
  />


)
})}

<TractForm mutate={mutate} sexId={sex_data.id} references={references}></TractForm>
</Box>

</Box>
</>

    )


}

// //                                 {                              age_data.deleteLogs?.status!=="PENDING"        &&                    age_data.changelog.status === "APPROVED"?

//     <DeleteButton id={age_data.id} table={table} status={age_data.changelog.status} mutate={mutate}/>:""}

// //       </Flex>
// {          headerColor(age_data)!=="red"?
// <Heading> Sexes</Heading>:""

// }
// // 

// // {age_data.sex.map((sx,i)=>{
// //     return(
// //         <div key={i} >
// //         </div>
// //     )
// // })}

// // </>)}
