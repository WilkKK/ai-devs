import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import * as langchainService from '../services/langchainService'

type KnowledgeData = TaskResponse & {
    question: string
}

export class Knowledge extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    async resolveTask({ question }: KnowledgeData): Promise<unknown> {

        const response = ""
        const systemMessage = `
        ### Instructions:
        You have to answer the given question based on the context provided.
        The answer should be short, without additional information.
        ### Context:\n${response}
    `
        const responsAi = langchainService.invoke(systemMessage, question)
        return responsAi

    }

}