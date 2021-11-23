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
  
  export default function AgeForm(props) {
    const { references, mutate } = props;
    const { data, error } = useSWR("/api/ages", fetcher);
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    } = useForm();
  
    async function onSubmit(values) {
      const data = {
        data: { type: "CREATE", table: "ages", authorId: 1 },
        datatable: { ...values, speciesId: 1 }
      };
      console.log(values);
      return new Promise(async resolve => {
        await fetch("/api/sender", {
          method: "post",
          body: JSON.stringify({ changes: [data] })
        });
        await mutate();
        resolve();
      });
    }
  
    return (
      <div>
        <Container>
          {data
            ? <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.ageId}>
                  <FormLabel>Idade</FormLabel>
                  <Select
                    {...register("ageId", {
                      valueAsNumber: true,
                      required: "Necessário"
                    })}
                    placeholder="Selecione"
                  >
                    {data.map((age, i) =>
                      <option key={i} value={+age.id}>
                        {age.age_type}
                      </option>
                    )}
                  </Select>
                  <FormErrorMessage>
                    {errors.ageId && errors.ageId.message}
                  </FormErrorMessage>
                </FormControl>
  
                <FormControl isInvalid={errors.ageId}>
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
  