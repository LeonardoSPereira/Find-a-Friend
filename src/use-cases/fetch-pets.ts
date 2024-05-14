import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchPetsUseCaseRequest {
  city: string
  state: string
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository){}

  async execute({ city, state }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.findPetsByCity(city, state)

    if(!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets
    }
  }
}