import { Org, Pet, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface SearchPetsProps {
  city: string
  state: string
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' 
  energy_level?: 'LOW' | 'MEDIUM' | 'HIGH'
  environment?: string
}

interface OrgResponseProps {
  id: string
  name: string
  author_name: string
  email: string
  whatsapp: number
  zip_code: number
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: Decimal
  longitude: Decimal
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