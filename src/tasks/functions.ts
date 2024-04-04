import { EmbeddingCreateParams } from 'openai/resources'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import OpenAI from 'openai'
import fs from "fs";

type FuntionData = TaskResponse & {


}

export class Funtion extends TaskBasic {

    constructor(name: string) {
        super(name)
    }


    async resolveTask({msg }: FuntionData): Promise<unknown> {


       const response =  {
            "name": "addUser",
            "description": "add user based on user name, surname and year",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "provide name of the user"
                    },
                    "surname": {
                        "type": "string",
                        "description": "provide surname of the user"
                    },
                    "year": {
                        "type": "integer",
                        "description": "provide year of the user"
                    }
                }
            }
        }
        return  response
    }



}