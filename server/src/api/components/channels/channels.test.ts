import request from "supertest"
import app from "@root/app"
import { createJWT } from "@helpers/jwt"

/*
  Run single test
  yarn test -- src/api/components/channels/channels.test.ts
*/

const initId = "61fbb8ec07f6e8c00aef1630"
const jwtToken = createJWT(initId)

let channelId = ""

describe("Channel CRUD", () => {

  it("Create Channel", async () => {
    const payload = {
      "channel": {
        "name": "Test channel",
        "private": true
      },
      "userIds": [
        "61fbb8ec07f6e8c00aef1630"
      ]
    }
    await request(app)
      .post(`/api/v1.1/channels/`)
      .auth(jwtToken, { type: "bearer" })
      .send(payload)
      .expect(200)
      .then(response => {
        const channel = response.body

        expect(channel).not.toBeNull()

        expect(typeof channel._id).toBe("string")
        expect(typeof channel.name).toBe("string")

        channelId = channel._id
      })
  })

  it("Channels list", async () => {
    await request(app)
      .get(`/api/v1.1/channels/${initId}`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const channel = response.body[0]

        expect(response.body).not.toBeNull()
        expect(response.body.length).toBeGreaterThan(0)

        expect(typeof channel._id).toBe("string")
        expect(typeof channel.name).toBe("string")
      })
  })

  it("Get Chat by ID", async () => {
    await request(app)
      .get(`/api/v1.1/channels/channel/${channelId}`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const channel = response.body

        expect(channel).not.toBeNull()

        expect(typeof channel._id).toBe("string")
        expect(typeof channel.name).toBe("string")
      })
  })

  it("Get Users from Channel", async () => {
    await request(app)
      .get(`/api/v1.1/channels/users/${channelId}`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const user = response.body.users[0]

        expect(response.body.users).not.toBeNull()
        expect(response.body.users.length).toBeGreaterThan(0)

        expect(typeof user._id).toBe("string")
        expect(typeof user.username).toBe("string")
      })
  })

  // it("Get Messages from Channel", async () => {
    // await request(app)
    //   .get(`/api/v1.1/channels/messages/${channelId}`)
    //   .auth(jwtToken, { type: "bearer" })
    //   .expect(200)
    //   .then(response => {
        // const message = response.body[0]
        //
        // expect(response.body.messages).not.toBeNull()
        //
        // expect(typeof message._id).toBe("string")
        // expect(typeof message.userId._id).toBe("string")
        // expect(typeof message.userId.username).toBe("string")
        // expect(typeof message.userId.aviUrl).toBe("string")
        // expect(typeof message.channelId).toBe("string")
        // expect(typeof message.content).toBe("string")

        // expect(typeof response.body.messages).toBe("array")
  //     })
  // })

  it("Delete Channel by ID", async () => {
    await request(app)
      .delete(`/api/v1.1/channels/${channelId}`)
      .auth(jwtToken, { type: "bearer" })
      .expect(200)
      .then(response => {
        const { deletedChannel, deletedMembership } = response.body

        expect(typeof deletedChannel._id).toBe("string")
        expect(typeof deletedChannel.name).toBe("string")
        expect(typeof deletedChannel.private).toBe("boolean")
        expect(typeof deletedMembership._id).toBe("string")
      })
  })
})
