export interface CreateManyUsersRequest {
  groupName: string
  quantity: number
}
export interface DeleteManyUsersRequest {
  groupId: number
  startIndex: number
  endIndex: number
}

export interface CopyManyDirectoriesRequest {
  groupId: number
}
