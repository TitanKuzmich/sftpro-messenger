import request from "supertest"
import app from "@root/app"
import { createJWT } from "@helpers/jwt"

/*
  Run single test
  yarn test -- src/api/components/membership/membership.test.ts
*/

const initId = "61b8a3e1bfef59eea19114b0"
const jwtToken = createJWT(initId)

describe("Membership CRUD", () => {

  it("Membership list", async () => {
    await request(app)
      .get(`/api/v1.1/membership/`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const membership = response.body[0]

        expect(response.body).not.toBeNull()
        expect(response.body.length).toBeGreaterThan(0)

        expect(typeof membership.userId).toBe("string")
        expect(typeof membership.channelId).toBe("string")
      })
  })
})
