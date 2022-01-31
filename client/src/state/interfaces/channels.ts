export type ChannelPayload = {
  _id: string
  name: string
  private?: boolean
}

export type ChannelsState = {
  isLoading: boolean
  channels: Array<ChannelPayload>
}
