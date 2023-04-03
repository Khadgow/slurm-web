import { FormProvider, useForm } from 'react-hook-form'
import { CopyManyDirectoriesRequest } from '../api/requests'
import { FC } from 'react'
import { Button, Stack } from '@mui/material'
import { Selector, SelectorOptions } from 'components/FormInputs'
import { useGetGroupByIdQuery } from '../api'
import { Loader } from 'components/Loader'

interface FormProps {
  onSubmit: (values: CopyManyDirectoriesRequest) => void
  options: SelectorOptions
  isOptionsLoading: boolean
}

export const CopyManyDirectoriesForm: FC<FormProps> = ({
  onSubmit,
  options,
  isOptionsLoading,
}) => {
  const methods = useForm<CopyManyDirectoriesRequest>()
  const groupId = methods.watch('groupId')

  const { data, isFetching, isSuccess } = useGetGroupByIdQuery(groupId, {
    skip: !groupId,
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
          <Selector
            name="groupId"
            options={options}
            isLoading={isOptionsLoading}
            placeholder="Префикс"
          />
          <Button type="submit" variant="contained" color="secondary">
            Скопировать
          </Button>
          {isFetching && <Loader />}
          {isSuccess && data && (
            <div>В группе {data.users.length} пользователей</div>
          )}
        </Stack>
      </form>
    </FormProvider>
  )
}
