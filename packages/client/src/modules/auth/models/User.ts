import { Role } from './Role'
export interface User {
  id: number
  username: string
  email: string
  roles: Role[]
}
export interface Credentials {
  email: string
  password: string
}

export type UserFields = Pick<User, 'username' | 'email'> & {
  roles: number[]
  password?: string
}

export type RegisterFields = Pick<User, 'username' | 'email'> & {
  password: string
}
