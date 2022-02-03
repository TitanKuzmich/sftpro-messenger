import request from "supertest"
import * as uuid from "uuid"
import app from "@root/app"
import { createJWT } from "@helpers/jwt"

/*
  Run single test
  yarn test -- src/api/components/auth/auth.test.ts
*/

let workingToken = ""
const initSalt = uuid.v4()

describe("Auth CRUD", () => {

  it("Register", async () => {
    const payload = {
      username: `tiSai_${initSalt}`,
      password: "qwerty"
    }

    await request(app)
      .post(`/api/v1.1/auth/new`)
      .send(payload)
      .expect(200)
      .then(response => {
        const { token } = response.body

        workingToken = token

        expect(token).not.toBeNull()

        expect(typeof token).toBe("string")
      })
  })

  it("Auth", async () => {
    const payload = {
      username: "tiSai",
      password: "qwerty"
    }

    await request(app)
      .post(`/api/v1.1/auth/`)
      .send(payload)
      .expect(200)
      .then(response => {
        const { token } = response.body

        expect(token).not.toBeNull()

        expect(typeof token).toBe("string")
      })
  })
})
