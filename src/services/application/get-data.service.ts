import { People } from "../domain/models/people.model";
import { translateFields } from "../domain/utils/translator.util";
import StarwarsApiProvider from "../infrastructure/providers/starwars-api.provider";
import DynStarwarsRepository from "../infrastructure/repositories/dyn-starwars.repository";

class GetDataService {
  starWarsProvider = StarwarsApiProvider;
  dynStarwarsRepository = DynStarwarsRepository;
  async getData() {
    try {
        console.log("Inicio de obtención de datos")
        const endpointResponse : People[] = await this.starWarsProvider.getPeopleData();
        const dynamoResponse : People[] = await this.dynStarwarsRepository.getStarWarsData()
        console.log("Datos recuperados")
        if(!dynamoResponse.length)
          return translateFields(endpointResponse)
        return translateFields(endpointResponse).concat(translateFields(dynamoResponse));
    } catch (error) {
      console.error("Error al obtener los datos de Star Wars:", error);
      throw error
    }
  }
}

export default new GetDataService();
