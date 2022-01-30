import { FormData, Rules, ErrorsData } from "./types"

export const validateFormData = (data: FormData, rules: Rules): { errors: ErrorsData; isValid: boolean } => {
  const errorsData: ErrorsData = {}

  Object.keys(rules).forEach((key: string) => {
    let errorMessage: string = ""

    // Empty field validation
    if (rules[key].required && !data[key]) {
      errorMessage =
        rules[key].required && typeof rules[key].required === "string"
          ? (rules[key].required as string)
          : "Пожалуйста заполните все поля."
    }

    // Min validation
    const minValue = rules[key].min?.value || 0
    if (!errorMessage && data[key].toString().length < minValue) {
      errorMessage = rules[key].min?.message as string
    }

    // RegExp field validation
    if (!errorMessage && rules[key].validation && rules[key].validation?.reg) {
      const condition = new RegExp(rules[key].validation?.reg || "", "g")

      if (!condition.test(data[key].toString())) {
        errorMessage =
          rules[key].validation && typeof rules[key].validation?.message === "string"
            ? (rules[key].validation?.message as string)
            : "Некорретное поле"
      }
    }

    // Field equal other
    if (!errorMessage && rules[key].equal) {
      const otherFieldName = rules[key].equal?.field || ""

      if (data[key] !== data[otherFieldName]) {
        errorMessage = rules[key].equal?.message ?? `${key} not equal ${otherFieldName}`
        errorsData[otherFieldName] = errorMessage
      }
    }

    if (errorMessage) {
      errorsData[key] = errorMessage
    }
  })

  return { errors: errorsData, isValid: !Object.keys(errorsData).length }
}
