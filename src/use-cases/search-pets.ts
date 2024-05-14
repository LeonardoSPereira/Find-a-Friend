import { Pet } from "@prisma/client";
import { PetResponseProps, PetsRepository } from "@/repositories/pets-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface SearchPetsUseCaseRequest {
  city: string
  state: string
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' 
  energy_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: string

}

interface SearchPetsUseCaseResponse {
  pets: PetResponseProps[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository){}

  async execute({
    city,
    state,
    age,
    energy_level,
    environment,
    size 
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchPets({
      city,
      state,
      age,
      energy_level,
      environment,
      size
    })

    if(!pets) {
      throw new ResourceNotFoundError()
    }

    return {
      pets
    }
  }
}