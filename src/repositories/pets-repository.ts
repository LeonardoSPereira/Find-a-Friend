import { Pet, Prisma } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetsByCity(city: string, state: string): Promise<Pet[] | null>
  findPetById(id: string): Promise<Pet | null>
}