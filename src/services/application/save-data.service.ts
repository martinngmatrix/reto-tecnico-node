import { People } from "../domain/models/people.model";
import DynStarwarsRepository from "../infrastructure/repositories/dyn-starwars.repository";

class SaveDataService{
    dynStarwarsRepository = DynStarwarsRepository
    async saveData(event){
        try {
            console.log("Inicio de guardado de los datos")
            const bodyEvent : People = JSON.parse(event.body)
            await this.dynStarwarsRepository.saveStarWarsItem(bodyEvent)
            console.log("Guardado Finalizado")
            return true
          } catch (error) {
            console.error("Error al guardar el elemento:", error);
            throw error
          }  
    }
}

export default new SaveDataService()