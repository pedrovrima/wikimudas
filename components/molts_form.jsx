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






export default function MoltForm(props) {
  const { references, mutate } = props;
  function onSubmit(values) {
    const data = {data:{type:"CREATE",table:"molts",authorId:1},datatable:{...values,speciesId:1}}
    console.log(values)
    return new Promise(async resolve => {
      
      await  fetch("/api/sender",{method: "post",body:JSON.stringify(({changes:[data]}))})
      ;
        resolve();
        mutate()
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
            <FormLabel>Muda</FormLabel>
            <Select
              {...register("molt", { required: "Necessário" })}
              placeholder="Selecione"
            >
              <option value="FPJ">FPJ</option>
              <option value="FPF">FPF</option>
              <option value="FPA">FPA</option>
              <option value="DPB">DPB</option>
              <option value="DPA">DPA</option>
            </Select>
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.type}>
            <FormLabel>Extensão</FormLabel>
            <Select
              {...register("extension", { required: "Necessário" })}
              placeholder="Selecione"
            >
              <option value="Absent">Ausente</option>
              <option value="Limited">Limitada</option>
              <option value="Partial">Parcial</option>
              <option value="Incomplete">Incompleta</option>
              <option value="Eccentric">Excentrica</option>
              <option value="Complete">Completa</option>
            </Select>
            <FormErrorMessage>
              {errors.type && errors.type.message}
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
    </div>
  );
}
