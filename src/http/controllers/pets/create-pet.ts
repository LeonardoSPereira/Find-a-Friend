import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.number(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    environment: z.string(),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    org_id: z.string().uuid()
  })

  const data = createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  try {
    const { pet } = await createPetUseCase.execute(data)

    return reply.status(201).send({ 
      message: "Pet created successfully.",
      pet
    })
  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}