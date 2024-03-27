import { EmbeddingCreateParams } from 'openai/resources'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import OpenAI from 'openai'


type EmbeddingData = TaskResponse & {
    input: string[],
    question: string

}

export class Embedding extends TaskBasic {

    constructor(name: string) {
        super(name)
    }


    async resolveTask({ input = [], question }: EmbeddingData): Promise<unknown> {
        const chat = new OpenAI()
        const inputData: EmbeddingCreateParams = {
            "input": "Hawaiian pizza",
            "model": "text-embedding-ada-002"
          }
        const  result  =  await chat.embeddings.create(inputData)
        const embedding = result.data[0].embedding
        return embedding
    }



}