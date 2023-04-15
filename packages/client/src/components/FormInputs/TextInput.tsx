import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { FieldError, useFormContext } from 'react-hook-form'

type TextInputProps = TextFieldProps & { name: string }

export const TextInput: React.FC<TextInputProps> = ({ name, ...rest }) => {
  const { register, formState } = useFormContext()
  return (
    <TextField
      {...rest}
      {...register(name)}
      error={!!formState.errors?.[name]}
      helperText={(formState.errors?.[name] as FieldError)?.message}
    />
  )
}
