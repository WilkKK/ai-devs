import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import * as langchainService from '../services/langchainService'
import { optimaldbJson } from '../helpers/optimaldb'

type OptimaldbDate = TaskResponse & {
    question: string
}

export class Optimaldb extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    async compressItem(information: unknown[]): Promise<string> {
        const systemMessage = `
        ### Instructions:
        Compress user-supplied JSON. Return very short text and assign to a category with only important and key information like as favourite movie, favourite games , jobs, hobbies, inspirations, information what wearing on wedding, favourite thinks. Use english language.
        ### Example: like: matrix, boarder game, job:programmer
       
    `
        const responsAi = await langchainService.invoke(systemMessage, JSON.stringify(information))
        return responsAi;
    }

    async compressAllText() {
        let result: { [key: string]: string; } = {};
        for (let name in optimaldbJson) {
            let item = optimaldbJson[name];
            result[name] = await this.compressItem(item);
        }
        return JSON.stringify(result);
    }

    async resolveTask({ }: OptimaldbDate): Promise<unknown> {
        return await this.compressAllText();
    }

}