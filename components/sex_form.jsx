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

export default function SexForm(props) {
  const { references, mutate, ageId } = props;
  function onSubmit(values) {
    const data = {data:{type:"CREATE",table:"sex",authorId:1},datatable:{...values,ageId}}
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
            <FormLabel>Sexo</FormLabel>
            <Select
              {...register("sex", { required: "Necessário" })}
              placeholder="Selecione"
            >
              <option value="Male">Macho</option>
              <option value="Female">Fêmea</option>
              <option value="Unknown">Indeterminado</option>
              
            </Select>
            <FormErrorMessage>
              {errors.sex && errors.sex.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.sex}>
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
