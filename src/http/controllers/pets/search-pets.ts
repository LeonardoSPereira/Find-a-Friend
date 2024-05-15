import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetParamsSchema = z.object({
    city: z.string(),
    state: z.string()
  })

  const searchPetQuerySchema = z.object({
    age: z.coerce.number().optional(),
    energy_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    environment: z.string().optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  })

  const { city, state } = searchPetParamsSchema.parse(request.params)
  const { age, energy_level, environment, size } = searchPetQuerySchema.parse(request.query)

  const searchPetUseCase = makeSearchPetsUseCase()

  try {
    const { pets } = await searchPetUseCase.execute({
      city,
      state,
      age,
      energy_level,
      environment,
      size,
    })

    return reply.status(200).send({ 
      pets
    })
    
  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}