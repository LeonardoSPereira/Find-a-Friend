import { app } from "@/app";
import { createAndAuthenticateOrg } from "@/utils/test/create-an-authenticate-org";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("Should be able to create a pet", async () => {
    const { orgId, token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post("/pets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: 'Pet Name',
        about: 'About Pet',
        age: 5,
        size: 'SMALL',
        environment: 'Environment',
        energy_level: 'LOW',
        org_id: orgId
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    )
  })
})