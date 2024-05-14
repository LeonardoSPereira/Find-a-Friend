import { Org, Pet, Prisma } from "@prisma/client";
import { PetResponseProps, PetsRepository, SearchPetsProps } from "../pets-repository";
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

  async searchPets(data: SearchPetsProps) {
    const orgsByCity = await this.orgsRepository.findOrgsByCity(data.city, data.state)    

    if (!orgsByCity) {
      return null
    }

    let filteredPets: PetResponseProps[] = []

    orgsByCity.forEach(org => {
      const pets = this.pets
        .filter(pet => pet.org_id === org.id)
        .filter(pet => data.age ? pet.age === data.age : true)
        .filter(pet => data.size ? pet.size === data.size : true)
        .filter(pet => data.energy_level ? pet.energy_level === data.energy_level : true)
        .filter(pet => data.environment ? pet.environment === data.environment : true)
      
      const petsWithOrg = pets.map(pet => ({
        id: pet.id,
        name: pet.name,
        about: pet.about,
        age: pet.age,
        size: pet.size,
        environment: pet.environment,
        energy_level: pet.energy_level,
        org: {
          id: org.id,
          name: org.name,
          author_name: org.author_name,
          email: org.email,
          whatsapp: org.whatsapp,
          zip_code: org.zip_code,
          state: org.state,
          city: org.city,
          neighborhood: org.neighborhood,
          street: org.street,
          latitude: org.latitude,
          longitude: org.longitude
        }
      }))

      filteredPets = [...filteredPets, ...petsWithOrg] as PetResponseProps[]
    })

    if(filteredPets.length === 0) {
      return null
    }

    return filteredPets
  }

  async findPetById(id: string) {
    const pet = this.pets.find(pet => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}