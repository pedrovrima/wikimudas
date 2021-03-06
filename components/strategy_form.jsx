import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
  Container
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

export default function StrategyForm(props) {
  const { references, mutate } = props;
  function onSubmit(values) {
    const data = {data:{type:"CREATE",table:"strategy",authorId:1},datatable:{...values,speciesId:1}}
    console.log(values)
    return new Promise(async resolve => {
      
      await  fetch("/api/sender",{method: "post",body:JSON.stringify(({changes:[data]}))})
      ;
        await mutate()
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
    <div>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.type}>
            <FormLabel>Estratégia</FormLabel>
            <Select
              {...register("strategy", { required: "Necessário" })}
              placeholder="Selecione"
            >
              <option value="CBS">Complexa Básica</option>
              <option value="CAS">Complexa Alterna</option>
              <option value="SBS">Simples Básica</option>
              <option value="SAS">Simples Alterna</option>
            </Select>
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.type}>
            <FormLabel>Referência</FormLabel>
            <Select
              {...register("referenceId", { valueAsNumber:true,required: "Necessário" })}
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
    </div>
  );
}
