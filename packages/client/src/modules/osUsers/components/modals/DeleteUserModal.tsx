import React, { FC, useEffect } from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useDeleteUserMutation } from '../../api'

type DeleteUserModalProps = React.ComponentProps<typeof Dialog> & {
  onClose: () => void
  userId: number
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({
  userId,
  onClose,
  ...rest
}) => {
  const [deleteUser, { isSuccess, isLoading }] = useDeleteUserMutation()
  const onSubmit = () => {
    deleteUser(userId)
  }
  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess, onClose])

  return (
    <Dialog {...rest} onClose={onClose}>
      <DialogTitle>Подтвердите удаление пользователя</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Пользователь и его SLURM аккаунт будут удалены
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading} variant="outlined">
          Отменить
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isLoading}
          variant="contained"
          color="error"
        >
          {isLoading ? <CircularProgress /> : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
