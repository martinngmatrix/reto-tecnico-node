import { People } from "../models/people.model";

export interface StarWarsRepository {
    getStarWarsData(): Promise<People[]>;
    saveStarWarsItem(item : People): Promise<void>;
}