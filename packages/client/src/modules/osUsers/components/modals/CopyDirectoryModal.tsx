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
import { useCopyDirectoryMutation } from '../../api'

type CopyDirectoryModalProps = React.ComponentProps<typeof Dialog> & {
  onClose: () => void
  userId: number
}

export const CopyDirectoryModal: FC<CopyDirectoryModalProps> = ({
  userId,
  onClose,
  ...rest
}) => {
  const [copyDirectory, { isSuccess, isLoading }] = useCopyDirectoryMutation()
  const onSubmit = () => {
    copyDirectory(userId)
  }
  useEffect(() => {
    if (isSuccess) {
      onClose()
    }
  }, [isSuccess, onClose])

  return (
    <Dialog {...rest} onClose={onClose}>
      <DialogTitle>Подтвердите копирование директории пользователя</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Файлы пользователя будут скопированны в заданную директорию
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading} variant="outlined">
          Отменить
        </Button>
        <Button onClick={onSubmit} disabled={isLoading} variant="contained">
          {isLoading ? <CircularProgress /> : 'Скопировать'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
