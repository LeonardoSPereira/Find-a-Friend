import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetUseCase } from './get-pet'

describe('Get pet', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet', async () => {
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

    const petCreateResponse = await petsRepository.create({
      name: 'Pet Name',
      about: 'About pet',
      age: 5,
      size: 'SMALL',
      environment: 'Environment',
      energy_level: 'LOW',
      created_at: new Date(),
      org_id: orgCreateResponse.id
    })

    const getPetResponse = await sut.execute({
      id: petCreateResponse.id
    })

    expect(getPetResponse.pet).toEqual(expect.objectContaining({
      id: expect.any(String)
    }))
  })

  it("shouldn't be able to get a pet that doesn't exists", async () => {
    await orgsRepository.create({
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

    await expect(() => 
      sut.execute({
        id: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})