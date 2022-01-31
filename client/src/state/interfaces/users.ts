export type UserPayload = {
  username: string
  first_name: string
  last_name: string
}

export type UsersState = {
  isLoading: boolean
  users: Array<UserPayload>
}
