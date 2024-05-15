import { Prisma, $Enums } from "@prisma/client";
import { PetResponseProps, PetsRepository, SearchPetsProps } from "../pets-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data
    })

    return pet
  }

  async searchPets(data: SearchPetsProps) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: data.city,
          state: data.state
        },
        age: data.age ? data.age : undefined,
        size: data.size ? data.size : undefined,
        energy_level: data.energy_level ? data.energy_level : undefined,
        environment: data.environment ? data.environment : undefined
      },
      select: {
        id: true,
        name: true,
        about: true,
        age: true,
        size: true,
        energy_level: true,
        environment: true,
        org: {
          select: {
            id: true,
            name: true,
            author_name: true,
            email: true,
            whatsapp: true,
            zip_code: true,
            state: true,
            city: true,
            neighborhood: true,
            street: true,
            latitude: true,
            longitude: true
          }
        },
      }
    })

    const petsResponse = pets.map(pet => {
      return {
        id: pet.id,
        name: pet.name,
        about: pet.about,
        age: pet.age,
        size: pet.size,
        energy_level: pet.energy_level,
        environment: pet.environment,
        org: {
          id: pet.org.id,
          name: pet.org.name,
          author_name: pet.org.author_name,
          email: pet.org.email,
          whatsapp: Number(pet.org.whatsapp),
          zip_code: pet.org.zip_code,
          state: pet.org.state,
          city: pet.org.city,
          neighborhood: pet.org.neighborhood,
          street: pet.org.street,
          latitude: pet.org.latitude,
          longitude: pet.org.longitude
        }
      }
    })

    return petsResponse;
  }

  async findPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })

    return pet
  }
}