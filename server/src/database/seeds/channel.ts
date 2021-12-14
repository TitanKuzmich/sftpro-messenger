import { Channel } from "@database/models/channel.model"

const channel = [
  {
    name: 'general',
  },
  {
    name: 'random',
  },
  {
    name: 'development',
    private: true,
  }
]

export default {
  model: Channel,
  data: channel,
  initMethod: null
}
