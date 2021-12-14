import {Schema} from "mongoose"

export interface ChannelAttributes {
  _id: string
  name: string
  private?: boolean
}

export interface ChannelModel extends Schema, ChannelAttributes {}
