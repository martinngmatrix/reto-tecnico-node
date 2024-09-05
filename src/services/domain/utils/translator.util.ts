import { mapFields } from "../models/constants";

export function translateFields(resultList) : object[] {
    for (const element of resultList) {
      for (const [key, value] of Object.entries(element)) {
        const newField = mapFields[key];
        if (newField) {
          element[newField] = value;
          delete element[key];
        }
      }
    }
    return resultList;
  }