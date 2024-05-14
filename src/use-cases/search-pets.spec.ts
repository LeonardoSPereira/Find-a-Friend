import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { SearchPetsUseCase } from './search-pets'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

describe('Search pets', () => {
  let orgsRepository: InMemoryOrgsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: SearchPetsUseCase

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository(orgsRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able to search pets', async () => {
    // Create an org
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

    // Create 5 pets in first org
    for(let i = 0; i < 5; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        about: `About pet ${i}`,
        age: 5,
        size: 'SMALL',
        environment: 'Environment',
        energy_level: 'LOW',
        created_at: new Date(),
        org_id: orgCreateResponse.id
      })
    }

    // Create another org
    const specificOrgCreateResponse = await orgsRepository.create({
      name: 'Org Name',
      author_name: 'Author Name',
      email: 'org@email.com',
      password: 'password',
      whatsapp: 11912345678,
      zip_code: 12345678,
      state: 'New York',
      city: 'New York City',
      neighborhood: 'Neighborhood',
      street: 'Street',
      latitude: -85,
      longitude: 123
    })

    // Create a pet in the second org
    await petsRepository.create({
      name: 'Pet in New York',
      about: 'About pet in New York',
      age: 5,
      size: 'SMALL',
      environment: 'Environment',
      energy_level: 'LOW',
      created_at: new Date(),
      org_id: specificOrgCreateResponse.id
    })

    // Fetch pets by the city of the first org
    const fetchPetsByCityResponse = await sut.execute({
      city: 'City',
      state: 'State'
    })

    // Fetch pets by the city of the second org
    const specificPetsByCityResponse = await sut.execute({
      city: 'New York City',
      state: 'New York'
    })

    // validate the response of the first use case
    expect(fetchPetsByCityResponse.pets).toHaveLength(5)
    expect(fetchPetsByCityResponse.pets).toEqual([
      expect.objectContaining({ name: 'Pet 0' }),
      expect.objectContaining({ name: 'Pet 1' }),
      expect.objectContaining({ name: 'Pet 2' }),
      expect.objectContaining({ name: 'Pet 3' }),
      expect.objectContaining({ name: 'Pet 4' }),
    ])

    // validate the response of the second use case
    expect(specificPetsByCityResponse.pets).toHaveLength(1)
    expect(specificPetsByCityResponse.pets).toEqual([
      expect.objectContaining({ name: 'Pet in New York' })
    ])
  })

  it("should be able to search pets by it's characteristics ", async () => {
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

    for(let i = 0; i < 3; i++) {
      await petsRepository.create({
        name: `Pet ${i}`,
        about: `About pet ${i}`,
        age: i + 1,
        size: 'SMALL',
        environment: 'Environment',
        energy_level: 'LOW',
        created_at: new Date(),
        org_id: orgCreateResponse.id
      })
    }

    await petsRepository.create({
      name: 'Pet 6',
      about: 'About pet 6',
      age: 1,
      size: 'MEDIUM',
      environment: 'Calm environment',
      energy_level: 'HIGH',
      created_at: new Date(),
      org_id: orgCreateResponse.id
    })

    const searchByAgeResponse = await sut.execute({
      city: 'City',
      state: 'State',
      age: 3
    })

    expect(searchByAgeResponse.pets).toHaveLength(1)
    expect(searchByAgeResponse.pets).toEqual([
      expect.objectContaining({ age: 3 })
    ])

    const searchBySizeResponse = await sut.execute({
      city: 'City',
      state: 'State',
      size: 'MEDIUM'
    })

    expect(searchBySizeResponse.pets).toHaveLength(1)
    expect(searchBySizeResponse.pets).toEqual([
      expect.objectContaining({ size: 'MEDIUM' })
    ])

    const searchByEnergyLevelResponse = await sut.execute({
      city: 'City',
      state: 'State',
      energy_level: 'HIGH'
    })

    expect(searchByEnergyLevelResponse.pets).toHaveLength(1)
    expect(searchByEnergyLevelResponse.pets).toEqual([
      expect.objectContaining({ energy_level: 'HIGH' })
    ])

    const searchByEnvironmentResponse = await sut.execute({
      city: 'City',
      state: 'State',
      environment: 'Calm environment'
    })

    expect(searchByEnvironmentResponse.pets).toHaveLength(1)
    expect(searchByEnvironmentResponse.pets).toEqual([
      expect.objectContaining({ environment: 'Calm environment' })
    ])
  })


  it('should not be able to fetch pets if orgs not found', async () => {
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
        city: 'City',
        state: 'State'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})