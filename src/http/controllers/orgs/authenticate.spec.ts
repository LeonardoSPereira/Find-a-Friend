import request from "supertest"
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("should be able to authenticate", async () => {
    await request(app.server)
      .post("/orgs")
      .send({
        name: "Org Name",
        author_name: "Author Name",
        email: "johndoe@email.com",
        password: "123456",
        whatsapp: 71887404932,
        zip_code: 12345678,
        state: "State",
        city: "City",
        neighborhood: "Neighborhood",
        street: "Street",
        latitude: -60,
        longitude: 150
      })

    const response = await request(app.server)
      .post("/sessions")
      .send({
        email: "johndoe@email.com",
        password: "123456"
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})