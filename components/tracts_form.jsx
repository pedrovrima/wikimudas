import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
  Container, 
  Textarea
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
const fetcher = url => fetch(url).then(res => res.json());






export default function TractForm(props) {
  const { references, mutate, sexId } = props;
  const { data, error } = useSWR("/api/tracts", fetcher);
  console.log(props)

  function onSubmit(values) {
    const data = {data:{type:"CREATE",table:"ageSexTraits",authorId:1},datatable:{...values,sexId}}
    console.log(values)
    return new Promise(async resolve => {
      
      await  fetch("/api/sender",{method: "post",body:JSON.stringify(({changes:[data]}))})
      ;
      await       mutate()

      resolve();
      });
    ;
  }
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  return (
    <>
    {data? 
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.tractId}>
            <FormLabel>Parte</FormLabel>
            <Select
              {...register("tractId", {valueAsNumber:true, required: "Necessário" })}
              placeholder="Selecione"
            >
                  {data.map((ml, i) =>
                    <option key={i} value={+ml.id}>
                      {ml.pt_name}
                    </option>
                  )}
            </Select>
            <FormErrorMessage>
              {errors.tractId && errors.tractId.message}
            </FormErrorMessage>
          </FormControl>


                              <FormControl isInvalid={errors.characteristics}>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              {...register("characteristics", {required: "Necessário" })}
              
            >
            </Textarea>
            <FormErrorMessage>
              {errors.characteristics && errors.characteristics.message}
            </FormErrorMessage>
          </FormControl>



          <FormControl isInvalid={errors.type}>
            <FormLabel>Referência</FormLabel>
            <Select
              {...register("referenceId", {valueAsNumber:true, required: "Necessário" })}
              placeholder="Selecione"
            >
              {references.map((ref, i) => {
                return (
                  <option key={i} value={ref.id}>
                    {ref.title}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>
          <Button isLoading={isSubmitting} type="submit">
            {" "}Enviar{" "}
          </Button>
        </form>
      </Container>
    </div>:""}</>
  );
}
