import { Org, Pet, Prisma } from "@prisma/client";

export interface SearchPetsProps {
  city: string
  state: string
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' 
  energy_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: string
}

interface OrgResponseProps {
  org: Omit<Org, "password">;
}

export interface PetResponseProps {
  id: string,
  name: string,
  about: string,
  age: number,
  size: 'SMALL' | 'MEDIUM' | 'LARGE',
  energy_level: 'LOW' | 'MEDIUM' | 'HIGH',
  environment: string,
  org: OrgResponseProps
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchPets(data: SearchPetsProps): Promise<PetResponseProps[] | null>
  findPetById(id: string): Promise<Pet | null>
}