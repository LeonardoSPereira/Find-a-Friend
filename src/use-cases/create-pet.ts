import { orgsRepository } from "@/repositories/orgs-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
  id?: string
  name: string,
  about: string,
  age: number,
  size: 'SMALL' | 'MEDIUM' | 'LARGE',
  environment: string,
  energy_level: 'LOW' | 'MEDIUM' | 'HIGH',
  created_at: Date,
  org_id: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: orgsRepository,
    private petsRepository: PetsRepository
  ){}

  async execute(data: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const orgAlreadyExists = await this.orgsRepository.findOrgById(data.org_id)

    if(!orgAlreadyExists) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create(data)

    return {
      pet
    }
  }
}