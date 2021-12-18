import request from "supertest"
import app from "@root/app"
import { createJWT } from "@helpers/jwt"
import { UserModel } from "@interfaces/models/user.interface"

/*
  Run single test
  yarn test -- src/api/components/user/user.test.ts
*/

const initId = "61b8a3e1bfef59eea19114b0"
const jwtToken = createJWT(initId)

describe("User CRUD", () => {

  it("User list", async () => {
    await request(app)
      .get(`/api/v1.1/users/`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const user = response.body[0]

        expect(response.body).not.toBeNull()
        expect(response.body.length).toBeGreaterThan(0)

        expect(typeof user._id).toBe("string")
        expect(typeof user.username).toBe("string")
        expect(typeof user.aviUrl).toBe("string")
      })
  })

  it("Get User by ID", async () => {
    await request(app)
      .get(`/api/v1.1/users/${initId}`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const user = response.body.response

        expect(user).not.toBeNull()

        expect(typeof response.body.userId).toBe("string")
        expect(typeof user._id).toBe("string")
        expect(typeof user.username).toBe("string")
        expect(typeof user.aviUrl).toBe("string")
      })
  })

  it("Update User by ID", async () => {
    const payload: Partial<UserModel> = {
      aviUrl: "https://sun9-35.userapi.com/impg/HfJILJmnmK331IbsubOngIgPQPFbUqRfp2vGVA/EB2spfMb9vo.jpg?size=1080x1350&quality=96&sign=db2f728a7775bfaec7e4d583a94f1f60&type=album"
    }

    await request(app)
      .patch(`/api/v1.1/users/edit/${initId}`)
      .send(payload)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const id = response.body.updatedId
        expect(typeof id).toBe("string")
      })
  })
})
