import { app } from "@/app";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("Should be able to create an org", async () => {
    const org = {
      name: "Org Name",
      author_name: "Author Name",
      email: "ju@bak.kz",
      password: "123456",
      whatsapp: 71887404932,
      zip_code: 12345678,
      state: "State",
      city: "City",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: -60,
      longitude: 150
    }

    const response = await request(app.server)
      .post("/orgs")
      .send(org)

    expect(response.statusCode).toBe(201)
  })
})