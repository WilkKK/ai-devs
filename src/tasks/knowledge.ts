import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import * as qdrantService from '../services/qdrant'
import * as langchainService from '../services/langchainService'

type KnowledgeData = TaskResponse & {
    question: string
}


export class Knowledge extends TaskBasic {

    constructor(name: string) {
        super(name)
    }



    async resolveTask({ msg, input, question }: KnowledgeData): Promise<unknown> {

        const response = ""
        const systemMessage = `
        ### Instructions:
        You have to answer the given question based on the context provided.
        The answer should be short, without additional information.
        ### Context:\n${response}
    `
        const responsAi = langchainService.invoke(systemMessage, question)
        console.log("answer: " + responsAi)
        return responsAi

    }



}