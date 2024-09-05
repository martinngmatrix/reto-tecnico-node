import SaveDataService from "../../../src/services/application/save-data.service";
import DynStarwarsRepository from "../../../src/services/infrastructure/repositories/dyn-starwars.repository";
import { People } from "../../../src/services/domain/models/people.model";

jest.mock("../../../src/services/infrastructure/repositories/dyn-starwars.repository");

describe("SaveDataService", () => {
  const mockPerson: People = {
    name: "Han Solo",
    height: "180",
    mass: "80",
    hair_color: "brown",
    skin_color: "fair",
    eye_color: "brown",
    birth_year: "29BBY",
    gender: "male",
    homeworld: "Corellia",
    films: ["A New Hope"],
    species: ["Human"],
    vehicles: ["Speeder"],
    starships: ["Millennium Falcon"],
    created: "2021-01-01T00:00:00Z",
    edited: "2021-01-01T00:00:00Z",
    url: "https://swapi.dev/api/people/14/"
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería guardar los datos correctamente y devolver true", async () => {
    const event = { body: JSON.stringify(mockPerson) };
    (DynStarwarsRepository.saveStarWarsItem as jest.Mock).mockResolvedValue(undefined);

    const result = await SaveDataService.saveData(event);

    expect(result).toBe(true);
    expect(DynStarwarsRepository.saveStarWarsItem).toHaveBeenCalledWith(mockPerson);
  });

  it("debería manejar errores y lanzar la excepción cuando ocurre un error", async () => {
    const event = { body: JSON.stringify(mockPerson) };
    (DynStarwarsRepository.saveStarWarsItem as jest.Mock).mockRejectedValue(new Error("Error al guardar"));

    await expect(SaveDataService.saveData(event)).rejects.toThrow("Error al guardar");
    expect(DynStarwarsRepository.saveStarWarsItem).toHaveBeenCalledWith(mockPerson);
  });
});
