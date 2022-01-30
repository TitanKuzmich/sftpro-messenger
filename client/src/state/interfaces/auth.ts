export type UserPayload = {
  email: string
  first_name: string
  last_name: string
}

export type AuthState = {
  isLoading: boolean
  user: UserPayload
}
