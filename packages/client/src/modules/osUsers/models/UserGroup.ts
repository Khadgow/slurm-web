import { OsUser } from './OsUser'

export interface UserGroup {
  id: number
  name: string
}
export interface GroupWithUsers {
  id: number
  name: string
  users: OsUser[]
}
