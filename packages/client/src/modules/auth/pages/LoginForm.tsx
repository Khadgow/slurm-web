import { useForm } from 'react-hook-form'
import { Box, Button, Stack, TextField } from '@mui/material'
import { Credentials } from '../models'
import { useLoginMutation } from '../api'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<Credentials>()
  const navigate = useNavigate()

  const [login, { isSuccess, data }] = useLoginMutation()

  const onSubmit = (credentials: Credentials) => {
    login(credentials)
  }

  useEffect(() => {
    if (isSuccess && data) {
      window.localStorage.setItem('USER_TOKEN', data.token)
      navigate('/')
    }
  }, [data, isSuccess, navigate])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <h2>Войти</h2>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width="300px">
          <TextField {...register('email')} label="Email" />
          <TextField {...register('password')} label="Пароль" type="password" />
          <Button variant="contained" type="submit">
            Войти
          </Button>
          <Link to="/register">Нет аккаунта? Зарегистрироваться</Link>
        </Stack>
      </form>
    </Box>
  )
}
