import { useForm, FormProvider } from 'react-hook-form'
import { Box, Button, Stack } from '@mui/material'
import { Credentials } from '../models'
import { useLoginMutation } from '../api'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextInput } from 'components/FormInputs'
import { toast } from 'react-toastify'

export const LoginForm = () => {
  const methods = useForm<Credentials>()
  const navigate = useNavigate()

  const [login, { isSuccess, error, isError }] = useLoginMutation()

  const onSubmit = (credentials: Credentials) => {
    login(credentials)
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/')
    }
  }, [isSuccess, navigate])

  useEffect(() => {
    if (isError && error && 'data' in error) {
      toast.error(error.data.message)
    }
  }, [isError, error])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <h2>Войти</h2>
      <FormProvider {...methods}>
        <form
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Stack spacing={2} width="300px">
            <TextInput name="name" label="Имя пользователя" />
            <TextInput name="password" label="Пароль" type="password" />
            <Button variant="contained" type="submit">
              Войти
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  )
}
