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


export default function ReferenceForm(props) {
  const {type} = props 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  function onSubmit(values) {
    const data = {data:{type,table:"reference",authorId:1},datatable:values}
    return new Promise(async resolve => {
      
      await  fetch("/api/sender",{method: "post",body:JSON.stringify(({changes:[data]}))})
      ;
        resolve();
      });
    ;
  }
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.type}>
          <FormLabel>Tipo de Referência</FormLabel>
          <Select
            {...register("type", { required: "Necessário" })}
            placeholder="Selecione"
          >
            <option value="book">Livro</option>
            <option value="article">Artigo</option>
            <option value="thesis">Tese</option>
            <option value="monitoring">Monitoramento</option>
          </Select>
          <FormErrorMessage>
            {errors.type && errors.type.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.title}>
          <FormLabel>Título</FormLabel>
          <Input {...register("title", { required: true })} />
        </FormControl>
        <FormControl isInvalid={errors.authors}>
          <FormLabel>Autores</FormLabel>
          <Input {...register("authors", { required: true })} />
          <FormHelperText>
            Coloque em formato de Referência (Sobrenome, N.).
          </FormHelperText>
          <FormHelperText>
            Se forem mais de três autores, utilize et al. após o primeiro autor.
          </FormHelperText>
          <FormHelperText>
            Em caso de Monitoramento, use o nome da Organização responsável
          </FormHelperText>
        </FormControl>
        <FormControl isInvalid={errors.location}>
          <FormLabel>Localidade</FormLabel>
          <Input {...register("location", { required: true })} />
          <FormHelperText>
            Localidade em que as informações da refência foram retiradas
          </FormHelperText>
          <FormHelperText>
            Tente ser o mais específico possível (ex. Mantiqueira, Sudeste do
            Brasil)
          </FormHelperText>
        </FormControl>
        <Button isLoading={isSubmitting} type="submit">
          {" "}Enviar{" "}
        </Button>
      </form>
    </Container>
  );
}
