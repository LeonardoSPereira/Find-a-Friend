import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { FastifyInstance } from "fastify"
import request from "supertest"

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const hashedPassword = await hash("123456", 6)

  const org = await prisma.org.create({
    data: {
      name: "Org Name",
      author_name: "Author Name",
      email: "johndoe@email.com",
      password: hashedPassword,
      whatsapp: 71887404932,
      zip_code: 12345678,
      state: "State",
      city: "City",
      neighborhood: "Neighborhood",
      street: "Street",
      latitude: -60,
      longitude: 150
    }
  })

  const authResponse = await request(app.server)
    .post("/sessions")
    .send({
      email: "johndoe@email.com",
      password: "123456"
    })

  const { token } = authResponse.body

  return { orgId: org.id, token }
}