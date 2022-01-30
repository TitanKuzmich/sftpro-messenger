export type Rules = {
  [key: string]: {
    required?: boolean | string

    validation?: {
      reg: RegExp
      message?: string
    }

    min?: {
      value: number
      message: string
    }

    equal?: {
      field: string
      message: string
    }
  }
}

export type FormData = {
  [key: string]: any
}

export type ErrorsData = {
  [key: string]: string
}
