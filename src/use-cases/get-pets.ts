import { Pet } from "@prisma/client";
import { PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPetsUseCaseRequest {
  city: string
  state: string
}

interface GetPetsUseCaseResponse {
  pets: Pet[]
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetsRepository){}

  async execute({ city, state }: GetPetsUseCaseRequest): Promise<GetPetsUseCaseResponse> {
    const pets = await this.petsRepository.findPetsByCity(city, state)

    if(!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets
    }
  }
}