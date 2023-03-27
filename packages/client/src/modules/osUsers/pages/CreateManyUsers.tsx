import { useCreateManyUsersMutation } from '../api'
import { CreateManyUsersRequest } from '../api/requests'
import { CreateManyUsersForm } from '../components/CreateManyUsersForm'
import { ListOfCreatedUsers } from '../components/ListOfCreatedUsers'

export const CreateManyUsers = () => {
  const [createManyUsers, { data, isSuccess }] = useCreateManyUsersMutation()

  const onSubmit = (values: CreateManyUsersRequest) => {
    createManyUsers({ ...values, quantity: Number(values.quantity) })
  }

  if (isSuccess) {
    return <ListOfCreatedUsers users={data} />
  }
  return <CreateManyUsersForm onSubmit={onSubmit} />
}
