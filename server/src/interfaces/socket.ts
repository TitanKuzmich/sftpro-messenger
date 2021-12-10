export type SocketEvent = {
  type: string
  to?: number
  payload?: any
}

export type Sessions = {
  [userId: number]: Array<string>
}
