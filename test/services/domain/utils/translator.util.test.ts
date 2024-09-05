import { translateFields } from "../../../../src/services/domain/utils/translator.util";

describe("translateFields", () => {
  it("debería traducir los campos según el mapFields", () => {
    const input = [
      { name: "John", height: "180", mass: "75", hair_color: "blond" },
      { name: "Jane", height: "160", mass: "60", hair_color: "brown" }
    ];

    const expectedOutput = [
      { nombre: "John", altura: "180", peso: "75", color_cabello: "blond" },
      { nombre: "Jane", altura: "160", peso: "60", color_cabello: "brown" }
    ];

    const result = translateFields(input);

    expect(result).toEqual(expectedOutput);
  });

  it("debería ignorar campos que no están en mapFields", () => {
    const input = [
      { name: "John", height: "180", mass: "75", hair_color: "blond", country: "USA" },
      { name: "Jane", height: "160", mass: "60", hair_color: "brown", country: "USA" }
    ];

    const expectedOutput = [
      { nombre: "John", altura: "180", peso: "75", color_cabello: "blond", country: "USA" },
      { nombre: "Jane", altura: "160", peso: "60", color_cabello: "brown", country: "USA" }
    ];

    const result = translateFields(input);

    expect(result).toEqual(expectedOutput);
  });

  it("debería devolver una lista vacía cuando la entrada es una lista vacía", () => {
    const input: object[] = [];

    const result = translateFields(input);

    expect(result).toEqual([]);
  });

  it("debería manejar correctamente cuando no se encuentra un campo en mapFields", () => {
    const input = [
      { name: "John", height: "180", mass: "75", gender: "male" }
    ];

    const expectedOutput = [
      { nombre: "John", altura: "180", peso: "75", genero: "male" }
    ];

    const result = translateFields(input);

    expect(result).toEqual(expectedOutput);
  });
});
