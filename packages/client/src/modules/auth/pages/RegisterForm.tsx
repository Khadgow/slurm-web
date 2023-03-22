import { useForm } from 'react-hook-form'
import { Box, Button, Stack, TextField } from '@mui/material'
import { useRegisterMutation } from '../api'
import { RegisterFields } from '../models'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm<RegisterFields>()
  const navigate = useNavigate()

  const [login, { isSuccess, data }] = useRegisterMutation()

  const onSubmit = (credentials: RegisterFields) => {
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
      <h2>Зарегистироваться</h2>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width="300px">
          <TextField {...register('email')} label="Email" />
          <TextField {...register('username')} label="Имя пользователя" />
          <TextField {...register('password')} label="Пароль" type="password" />
          <Button variant="contained" type="submit">
            Зарегистрироваться
          </Button>
          <Link to="/login">Уже есть аккаунт? Войти</Link>
        </Stack>
      </form>
    </Box>
  )
}
