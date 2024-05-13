import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { compare } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from './create-pet'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Create Pet', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: CreatePetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new CreatePetUseCase(orgsRepository, petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const orgCreateResponse = await orgsRepository.create({
      name: 'Org Name',
      author_name: 'Author Name',
      email: 'org@email.com',
      password: 'password',
      whatsapp: 11912345678,
      zip_code: 12345678,
      state: 'State',
      city: 'City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      latitude: -85,
      longitude: 123
    })

    const petCreateResponse = await sut.execute({
      name: 'Pet Name',
      about: 'About Pet',
      age: 5,
      size: 'SMALL',
      environment: 'Environment',
      energy_level: 'LOW',
      created_at: new Date(),
      org_id: orgCreateResponse.id
    })

    expect(petCreateResponse.pet).toEqual(expect.objectContaining({
      id: expect.any(String),
    }))
  })

  it("shouldn't be able to create a new pet in a org that don't exists", async () => {

    await expect(() => 
      sut.execute({
        name: 'Pet Name',
        about: 'About Pet',
        age: 5,
        size: 'SMALL',
        environment: 'Environment',
        energy_level: 'LOW',
        created_at: new Date(),
        org_id: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})