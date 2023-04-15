import { FormProvider, useForm } from 'react-hook-form'
import { DeleteManyUsersRequest } from '../api/requests'
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { Selector, SelectorOptions, TextInput } from 'components/FormInputs'
import { useGetGroupByIdQuery } from '../api'
import { Loader } from 'components/Loader'
import { number, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SCHEMA_ERRORS } from '../../../constants/errors'

interface FormProps {
  onSubmit: (values: DeleteManyUsersRequest) => void
  options: SelectorOptions
  isOptionsLoading: boolean
}

const formSchema = object({
  groupId: number()
    .typeError(SCHEMA_ERRORS.number)
    .integer(SCHEMA_ERRORS.integer)
    .required(SCHEMA_ERRORS.required),
  startIndex: number()
    .typeError(SCHEMA_ERRORS.number)
    .integer(SCHEMA_ERRORS.integer)
    .required(SCHEMA_ERRORS.required),
  endIndex: number()
    .typeError(SCHEMA_ERRORS.number)
    .integer(SCHEMA_ERRORS.integer)
    .required(SCHEMA_ERRORS.required),
})

export const DeleteManyUsersForm: FC<FormProps> = ({
  onSubmit,
  options,
  isOptionsLoading,
}) => {
  const methods = useForm<DeleteManyUsersRequest>({
    resolver: yupResolver(formSchema),
  })
  const groupId = methods.watch('groupId')

  const { data, isFetching, isSuccess } = useGetGroupByIdQuery(groupId, {
    skip: !groupId,
  })
  console.log('form', methods.formState.errors)
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          style={{
            width: '350px',
          }}
        >
          <Selector
            name="groupId"
            options={options}
            isLoading={isOptionsLoading}
            placeholder="Префикс"
          />

          <TextInput name="startIndex" label="Начало" />
          <TextInput name="endIndex" label="Конец" />
          <Button type="submit" variant="contained" color="error">
            Удалить
          </Button>
          {isFetching && <Loader />}
          {isSuccess && data && (
            <div>
              В группе {data.users.length} пользователей, id от{' '}
              {data.users?.[0]?.groupIndex} до{' '}
              {data.users?.[data.users.length - 1]?.groupIndex}
            </div>
          )}
        </Stack>
      </form>
    </FormProvider>
  )
}
