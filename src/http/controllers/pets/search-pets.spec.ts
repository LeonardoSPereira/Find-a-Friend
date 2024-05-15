import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateOrg } from "@/utils/test/create-an-authenticate-org";
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Search Pets (e2e)", () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only("Should be able to search pets", async () => {
    const { orgId, orgCity, orgState } = await createAndAuthenticateOrg(app)

    await prisma.pet.createMany({
      data: [
        {
          name: 'Pet Name',
          about: 'About Pet',
          age: 5,
          size: 'SMALL',
          environment: 'Environment',
          energy_level: 'LOW',
          org_id: orgId
        },
        {
          name: 'Pet Name 2',
          about: 'About Pet 2',
          age: 5,
          size: 'MEDIUM',
          environment: 'Environment 2',
          energy_level: 'MEDIUM',
          org_id: orgId
        },
        {
          name: 'Pet Name 3',
          about: 'About Pet 3',
          age: 1,
          size: 'LARGE',
          environment: 'Environment 3',
          energy_level: 'HIGH',
          org_id: orgId
        }
      ]
    })

    const response = await request(app.server)
      .get(`/pets/${orgCity}/${orgState}?age=5`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        id: expect.any(String),
      }),
      expect.objectContaining({
        id: expect.any(String),
      })
    ])
  })
})