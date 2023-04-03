import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material'
import React, { FC } from 'react'

export type BasicModalProps = React.ComponentProps<typeof Dialog> & {
  onSubmit: () => void
  onClose: () => void
  title: string
  content: string
  cancelText: string
  submitText: string
}

export const BasicModal: FC<BasicModalProps> = ({
  onSubmit,
  title,
  content,
  cancelText,
  submitText,
  ...rest
}) => {
  const onSubmitWithClose = () => {
    onSubmit()
    rest.onClose()
  }
  return (
    <Dialog {...rest}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={rest.onClose}>{cancelText}</Button>
        <Button onClick={onSubmitWithClose}>{submitText}</Button>
      </DialogActions>
    </Dialog>
  )
}
