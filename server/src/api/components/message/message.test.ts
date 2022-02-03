import request from "supertest"
import app from "@root/app"
import { createJWT } from "@helpers/jwt"

/*
  Run single test
  yarn test -- src/api/components/message/message.test.ts
*/

const initId = "61fbb8ec07f6e8c00aef1630"
const jwtToken = createJWT(initId)
const channelId = "61fbb8ef07f6e8c00aef1639"

let messageId = ""

describe("Message CRUD", () => {

  it("Create Message", async () => {
    const payload = {
      userId: initId,
      channelId: channelId,
      content: "Test message"
    }

    await request(app)
      .post(`/api/v1.1/messages/`)
      .auth(jwtToken, { type: "bearer" })
      .send(payload)
      .expect(200)
      .then(response => {
        const message = response.body

        expect(typeof message._id).toBe("string")
        expect(typeof message.userId._id).toBe("string")
        expect(typeof message.userId.username).toBe("string")
        expect(typeof message.userId.aviUrl).toBe("string")
        expect(typeof message.channelId).toBe("string")
        expect(typeof message.content).toBe("string")

        messageId = message._id
      })
  })

  it("Update Message by ID", async () => {
    const payload = {
      content: "lorem"
    }

    await request(app)
      .patch(`/api/v1.1/messages/edit/${messageId}`)
      .send(payload)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const { _id, content } = response.body.updatedMessage

        expect(typeof _id).toBe("string")
        expect(typeof content).toBe("string")
      })
  })

  it("Messages list", async () => {
    await request(app)
      .get(`/api/v1.1/messages/`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const message = response.body[0]

        expect(response.body).not.toBeNull()
        expect(response.body.length).toBeGreaterThan(0)

        expect(typeof message._id).toBe("string")
        expect(typeof message.userId).toBe("string")
        expect(typeof message.channelId).toBe("string")
        expect(typeof message.content).toBe("string")
      })
  })

  it("Get Message by ID", async () => {
    await request(app)
      .get(`/api/v1.1/messages/${messageId}`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const message = response.body

        expect(message).not.toBeNull()

        expect(typeof message._id).toBe("string")
        expect(typeof message.userId).toBe("string")
        expect(typeof message.channelId).toBe("string")
        expect(typeof message.content).toBe("string")
      })
  })

  it("Delete Message by ID", async () => {
    await request(app)
      .delete(`/api/v1.1/messages/${messageId}`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const { deletedId } = response.body

        expect(typeof deletedId).toBe("string")
      })
  })
})
