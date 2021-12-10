import { decrypt, createJWT } from "@helpers/jwt"
import { getUserById } from "@services/users.service"
import destroy from "@root/jest"

const jwtToken = createJWT(7)

describe("Testing Auth", () => {
  describe("Testing jwt", () => {
    it("Should read jwt", () => {
      const jwtData = decrypt(jwtToken)
      expect(jwtData).not.toBeNull()
    })

    it("Should get UserId by jwt", async () => {
      let userId = null
      const jwtData = decrypt(jwtToken)

      if (jwtData && jwtData.user_id) {
        const user = await getUserById(jwtData.user_id)
        userId = user?.id
      }

      expect(userId).not.toBeNull()
    })
  })
})

afterAll(async () => {
  await destroy()
})
