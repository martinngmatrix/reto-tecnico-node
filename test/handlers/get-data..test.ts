
import { main } from "../../src/handlers/get-data";
import getDataService from "../../src/services/application/get-data.service";
import { People } from "../../src/services/domain/models/people.model";

jest.mock("../../src/services/application/get-data.service");

describe("main handler", () => {
  const mockData : [People] = [
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver una respuesta HTTP 200 con los datos obtenidos", async () => {
    (getDataService.getData as jest.Mock).mockResolvedValue(mockData);

    const event = {};
    const result = await main(event);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify(mockData),
    });
    expect(getDataService.getData).toHaveBeenCalled();
  });
});
