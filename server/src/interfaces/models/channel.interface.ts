import {Schema} from "mongoose"

export interface ChannelAttributes {
  name: string
  private: boolean
}

export interface ChannelModel extends Schema, ChannelAttributes {}
