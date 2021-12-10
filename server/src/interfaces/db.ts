import {Document} from "mongoose"

export interface DbKeys extends Partial<Document> {
  [key: string]: any
}

export type DBResponse<T> = Promise<T | null>
