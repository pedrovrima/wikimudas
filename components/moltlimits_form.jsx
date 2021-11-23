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
import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());

export default function ReferenceForm(props) {
  const { references, mutate } = props;
  const { data, error } = useSWR("/api/molt_limits", fetcher);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  async function onSubmit(values) {
    const data = {
      data: { type: "CREATE", table: "moltLimits", authorId: 1 },
      datatable: { ...values, speciesId: 1 }
    };
    console.log(values);
    return new Promise(async resolve => {
      await fetch("/api/sender", {
        method: "post",
        body: JSON.stringify({ changes: [data] })
      });
      mutate();
      resolve();
    });
  }

  return (
    <div>
      <Container>
        {data
          ? <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.type}>
                <FormLabel>Limite de Muda</FormLabel>
                <Select
                  {...register("moltLimitId", {
                    valueAsNumber: true,
                    required: "Necessário"
                  })}
                  placeholder="Selecione"
                >
                  {data.map((ml, i) =>
                    <option key={i} value={+ml.id}>
                      {ml.pt_name}
                    </option>
                  )}
                </Select>
                <FormErrorMessage>
                  {errors.type && errors.type.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.type}>
                <FormLabel>Referência</FormLabel>
                <Select
                  {...register("referenceId", {
                    valueAsNumber: true,
                    required: "Necessário"
                  })}
                  placeholder="Selecione"
                >
                  {references.map((ref, i) => {
                    return (
                      <option key={i} value={+ref.id}>
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
          : "loading"}
      </Container>
    </div>
  );
}
