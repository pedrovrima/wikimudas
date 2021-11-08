import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Textarea,
  Button,
  Container
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

export default function SkullForm(props) {
  const { references } = props;

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
            <FormLabel>Crânio</FormLabel>
            <Textarea size="sm"/>
            <FormErrorMessage>
              {errors.type && errors.type.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.type}>
            <FormLabel>Referência</FormLabel>
            <Select
              {...register("referenceId", { required: "Necessário" })}
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
