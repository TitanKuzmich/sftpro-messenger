import { Rules } from "@app/Auth/types"

const rules: Rules = {
  username: { required: true, },
  password: {
    required: true,
    min: {
      value: 6,
      message: "Пароль должен содержать минимум 6 символов"
    }
  },
  confirmPassword: {
    required: true,
    equal: {
      field: "password",
      message: "Пароли не совпадают"
    }
  }
}

export default rules
