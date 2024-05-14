import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";
import { orgsRepository } from "../orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private orgsRepository: orgsRepository) {}

  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      environment: data.environment,
      energy_level: data.energy_level,
      created_at: new Date(),

      org_id: data.org_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findPetsByCity(city: string, state: string) {
    const orgsByCity = await this.orgsRepository.findOrgsByCity(city, state)

    if (!orgsByCity) {
      return null
    }

    let petsByCity: Pet[] = []

    orgsByCity.forEach(org => {
      const pets = this.pets.filter(pet => pet.org_id === org.id)
      petsByCity = [...petsByCity, ...pets]
    })

    if(petsByCity.length === 0) {
      return null
    }

    return petsByCity
  }

  async findPetById(id: string) {
    const pet = this.pets.find(pet => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}