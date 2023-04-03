import { FormProvider, useForm } from 'react-hook-form'
import { CreateManyUsersRequest } from '../api/requests'
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { TextInput } from 'components/FormInputs'

interface FormProps {
  onSubmit: (values: CreateManyUsersRequest) => void
}

export const CreateManyUsersForm: FC<FormProps> = ({ onSubmit }) => {
  const methods = useForm<CreateManyUsersRequest>()

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
