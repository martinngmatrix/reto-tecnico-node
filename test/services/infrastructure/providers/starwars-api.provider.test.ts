
import axios from 'axios';
import { People } from '../../../../src/services/domain/models/people.model';
import  StarWarsAPIProvider  from '../../../../src/services/infrastructure/providers/starwars-api.provider';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('StarWarsAPIProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debería retornar los datos de las personas correctamente', async () => {
    const mockPeopleData: People[] = [
      {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
        birth_year: "19BBY",
        gender: "male",
        homeworld: "https://swapi.py4e.com/api/planets/1/",
        films: [
          "https://swapi.py4e.com/api/films/1/",
          "https://swapi.py4e.com/api/films/2/"
        ],
        species: [
          "https://swapi.py4e.com/api/species/1/"
        ],
        vehicles: [
          "https://swapi.py4e.com/api/vehicles/14/"
        ],
        starships: [
          "https://swapi.py4e.com/api/starships/12/"
        ],
        created: "2014-12-09T13:50:51.644000Z",
        edited: "2014-12-20T21:17:56.891000Z",
        url: "https://swapi.py4e.com/api/people/1/"
      }
    ];

    mockedAxios.get.mockResolvedValue({ data: { results: mockPeopleData } });

    const peopleData = await StarWarsAPIProvider.getPeopleData();

    expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.SWAPI_BASE_URL}/people`);

    expect(peopleData).toEqual(mockPeopleData);
  });

  it('debería lanzar un error si la llamada a la API falla', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    await expect(StarWarsAPIProvider.getPeopleData()).rejects.toThrow('API Error');
  });
});
