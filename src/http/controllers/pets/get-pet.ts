import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { makeGetPetUseCase } from "@/use-cases/factories/make-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string().uuid()
  })

  const { id } = getPetParamsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send({ 
      pet
    })
    
  } catch (error) {
    if(error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }
}