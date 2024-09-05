import GetDataService from "../../../src/services/application/get-data.service";
import DynStarwarsRepository from "../../../src/services/infrastructure/repositories/dyn-starwars.repository";
import StarwarsApiProvider from "../../../src/services/infrastructure/providers/starwars-api.provider";
import { People } from "../../../src/services/domain/models/people.model";
import { translateFields } from "../../../src/services/domain/utils/translator.util";

jest.mock("../../../src/services/infrastructure/providers/starwars-api.provider");
jest.mock("../../../src/services/infrastructure/repositories/dyn-starwars.repository");

describe("GetDataService", () => {
  const mockEndpointResponse: People[] = [
    {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "Tatooine",
      films: ["A New Hope"],
      species: ["Human"],
      vehicles: ["Speeder"],
      starships: ["X-wing"],
      created: "2021-01-01T00:00:00Z",
      edited: "2021-01-01T00:00:00Z",
      url: "https://swapi.dev/api/people/1/"
    }
  ];

  const mockDynamoResponse: People[] = [
    {
      name: "Darth Vader",
      height: "202",
      mass: "136",
      hair_color: "none",
      skin_color: "white",
      eye_color: "yellow",
      birth_year: "41.9BBY",
      gender: "male",
      homeworld: "Tatooine",
      films: ["A New Hope"],
      species: ["Human"],
      vehicles: ["TIE Fighter"],
      starships: ["TIE Advanced x1"],
      created: "2021-01-01T00:00:00Z",
      edited: "2021-01-01T00:00:00Z",
      url: "https://swapi.dev/api/people/4/"
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería combinar datos de la API y DynamoDB cuando ambos están disponibles", async () => {
    (StarwarsApiProvider.getPeopleData as jest.Mock).mockResolvedValue(mockEndpointResponse);
    (DynStarwarsRepository.getStarWarsData as jest.Mock).mockResolvedValue(mockDynamoResponse);

    const expectedOutput = translateFields(mockEndpointResponse).concat(translateFields(mockDynamoResponse));
    const result = await GetDataService.getData();

    expect(result).toEqual(expectedOutput);
  });

  it("debería devolver solo los datos de la API cuando DynamoDB no devuelve datos", async () => {
    (StarwarsApiProvider.getPeopleData as jest.Mock).mockResolvedValue(mockEndpointResponse);
    (DynStarwarsRepository.getStarWarsData as jest.Mock).mockResolvedValue([]);

    const expectedOutput = translateFields(mockEndpointResponse);

    const result = await GetDataService.getData();

    expect(result).toEqual(expectedOutput);
  });

  it("debería manejar errores en la obtención de datos y lanzar excepciones controladas", async () => {
    (StarwarsApiProvider.getPeopleData as jest.Mock).mockRejectedValue(new Error("Error en la API"));
    (DynStarwarsRepository.getStarWarsData as jest.Mock).mockResolvedValue(mockDynamoResponse);

    await expect(GetDataService.getData()).rejects.toThrow("Error en la API");
  });

});
