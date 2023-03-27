import { Role } from './Role'
export interface User {
  id: number
  username: string
  email: string
  roles: Role[]
}
export interface Credentials {
  name: string
  password: string
}

export type UserFields = Pick<User, 'username' | 'email'> & {
  roles: number[]
  password?: string
}

export interface RegisterFields {
  name: string
  password: string
}
