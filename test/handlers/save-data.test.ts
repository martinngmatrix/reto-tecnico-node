
import { main } from "../../src/handlers/save-data";
import saveDataService from "../../src/services/application/save-data.service";

jest.mock("../../src/services/application/save-data.service");

describe("main handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería devolver una respuesta HTTP 200 con el resultado de saveDataService", async () => {
    const mockEvent = {
      body: JSON.stringify({
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
      })
    };

    (saveDataService.saveData as jest.Mock).mockResolvedValue(true);

    const result = await main(mockEvent);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({ response: true }),
    });
    expect(saveDataService.saveData).toHaveBeenCalledWith(mockEvent);
  });

});
