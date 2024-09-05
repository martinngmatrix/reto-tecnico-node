import { People } from "../../domain/models/people.model";
import { APIProvider } from "../../domain/providers/api.provider";
import axios from 'axios';

class StarWarsAPIProvider implements APIProvider{
    baseURL = process.env.SWAPI_BASE_URL
    constructor(){}
    async getPeopleData(): Promise<People[]> {
        try{
            const baseResponse = await axios.get(`${this.baseURL}/people`);
            return baseResponse.data.results
        }
        catch(error){
            console.log(`Error al consultar API: ${error.message}`)
            throw error
        }
    }

}

export default new StarWarsAPIProvider()