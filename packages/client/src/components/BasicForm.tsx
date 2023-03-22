import { FormProvider, FieldValues, UseFormReturn } from 'react-hook-form'
import { Box, Button, Stack } from '@mui/material'
import React from 'react'

export type BasicForm<T extends FieldValues = FieldValues> = {
  methods: UseFormReturn<T>
  children: React.ReactNode
  onSubmit: (values: T) => void
  title: string
  buttonText: string
}
export const BasicForm = <T extends FieldValues = FieldValues>({
  methods,
  children,
  onSubmit,
  title,
  buttonText,
}: BasicForm<T>): JSX.Element => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <h2>{title}</h2>
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2} width="300px">
          {children}
          <Button type="submit">{buttonText}</Button>
        </Stack>
      </form>
    </FormProvider>
  </Box>
)
