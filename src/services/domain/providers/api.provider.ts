import { People } from "../models/people.model";

export interface APIProvider {
    getPeopleData(endpoint : string): Promise<People[]>
}