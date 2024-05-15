import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrg } from "@/utils/test/create-an-authenticate-org";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it("Should be able to get a pet", async () => {
    const { orgId } = await createAndAuthenticateOrg(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Pet Name',
        about: 'About Pet',
        age: 5,
        size: 'SMALL',
        environment: 'Environment',
        energy_level: 'LOW',
        org_id: orgId
      }
    })

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
      })
    )
  })
})