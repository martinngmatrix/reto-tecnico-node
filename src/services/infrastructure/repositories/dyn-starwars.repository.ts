import { DynamoDBDocumentClient, ScanCommand, PutCommand, ScanCommandInput } from "@aws-sdk/lib-dynamodb";
import { StarWarsRepository } from "../../domain/repositories/starwars.repository";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { People } from "../../domain/models/people.model";

class DynStarWarsRepository implements StarWarsRepository{
    dynamoDBClient : DynamoDBDocumentClient
    constructor(){
      const client = new DynamoDBClient({});
      this.dynamoDBClient = DynamoDBDocumentClient.from(client);
    }
    async getStarWarsData(): Promise<People[]> {
      try{
        const params: ScanCommandInput = {
          TableName: 'characters-table'
        }
        const dynamodbResponse = await this.dynamoDBClient.send(
          new ScanCommand(params)
        );
        if (!dynamodbResponse.Items) {
          throw new Error("No se encontraron elementos");
        }
        return dynamodbResponse.Items as People[]
      }
      catch(error){
        console.log(error)
        throw error
      }
    }
    async saveStarWarsItem(item: People): Promise<void> {
      await this.dynamoDBClient.send(
        new PutCommand({
          TableName: 'characters-table',
          Item: item,
          ConditionExpression: "attribute_not_exists(#pk)",
          ExpressionAttributeNames: {
            "#pk": "name"
          },
        })
      );
    }

}

export default new DynStarWarsRepository()