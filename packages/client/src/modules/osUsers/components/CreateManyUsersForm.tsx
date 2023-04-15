import { FormProvider, useForm } from 'react-hook-form'
import { CreateManyUsersRequest } from '../api/requests'
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { TextInput } from 'components/FormInputs'
import { number, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SCHEMA_ERRORS } from 'constants/errors'

interface FormProps {
  onSubmit: (values: CreateManyUsersRequest) => void
}

const formSchema = object({
  groupName: string()
    .typeError(SCHEMA_ERRORS.string)
    .required(SCHEMA_ERRORS.required),
  quantity: number()
    .typeError(SCHEMA_ERRORS.number)
    .integer(SCHEMA_ERRORS.integer)
    .required(SCHEMA_ERRORS.required),
})

export const CreateManyUsersForm: FC<FormProps> = ({ onSubmit }) => {
  const methods = useForm<CreateManyUsersRequest>({
    resolver: yupResolver(formSchema),
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          style={{
            width: '350px',
          }}
        >
          <TextInput name="groupName" label="Префикс" />
          <TextInput name="quantity" label="Количество пользователей" />
          <Button type="submit" variant="contained">
            Создать
          </Button>
        </Stack>
      </form>
    </FormProvider>
  )
}
