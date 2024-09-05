import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import DynStarWarsRepository from "../../../../src/services/infrastructure/repositories/dyn-starwars.repository";
import { People } from "../../../../src/services/domain/models/people.model";
import { mockClient } from "aws-sdk-client-mock";

const ddbMock = mockClient(DynamoDBDocumentClient);

describe("DynStarWarsRepository", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ddbMock.reset();
  });

  describe("getStarWarsData", () => {
    it("debería devolver datos correctamente de DynamoDB", async () => {
      const dynamoResponse = {
        Items: [
          {
            name: "Luke Skywalker",
          },
        ],
      };
      ddbMock.on(ScanCommand).resolvesOnce(dynamoResponse);

      const result = await DynStarWarsRepository.getStarWarsData();

      expect(result).toEqual([{ name: "Luke Skywalker" }]);
    });

    it("debería lanzar un error si no se encuentran elementos", async () => {
      const dynamoResponse = { Items: undefined };
      ddbMock.on(ScanCommand).resolvesOnce(dynamoResponse);

      await expect(DynStarWarsRepository.getStarWarsData()).rejects.toThrow(
        "No se encontraron elementos"
      );
    });

    it("debería manejar errores del cliente de DynamoDB", async () => {
      const error = new Error("DynamoDB Error");
      ddbMock.on(ScanCommand).rejects(error);

      await expect(DynStarWarsRepository.getStarWarsData()).rejects.toThrow(
        "DynamoDB Error"
      );
    });
  });

  describe("saveStarWarsItem", () => {
    const item: People = {
      name: "Luke Skywalker",
      height: "172",
      mass: "77",
      hair_color: "blond",
      skin_color: "fair",
      eye_color: "blue",
      birth_year: "19BBY",
      gender: "male",
      homeworld: "Tatooine",
      films: ["A New Hope", "The Empire Strikes Back"],
      species: ["Human"],
      vehicles: ["Speeder"],
      starships: ["X-wing"],
      created: "2023-01-01T00:00:00Z",
      edited: "2023-01-01T00:00:00Z",
      url: "https://example.com",
    };
    it("debería guardar un elemento correctamente en DynamoDB", async () => {
      ddbMock.on(PutCommand).resolvesOnce({});
      await DynStarWarsRepository.saveStarWarsItem(item);

      expect(ddbMock.commandCalls(PutCommand).length).toBe(1);
    });

    it("debería manejar errores al guardar un elemento en DynamoDB", async () => {
      const error = new Error("DynamoDB Error");
      ddbMock.on(PutCommand).rejects(error);

      await expect(
        DynStarWarsRepository.saveStarWarsItem(item)
      ).rejects.toThrow("DynamoDB Error");
    });
  });
});
