import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { useFormContext } from 'react-hook-form'

type TextInputProps = TextFieldProps & { name: string }

export const TextInput: React.FC<TextInputProps> = ({ name, ...rest }) => {
  const { register } = useFormContext()
  return <TextField {...rest} {...register(name)} />
}
