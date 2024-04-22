import { EmbeddingCreateParams } from 'openai/resources'
import { TaskBasic } from './taskBasic'
import OpenAI from 'openai'

export class Embedding extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    async resolveTask(): Promise<unknown> {
        const chat = new OpenAI()
        const inputData: EmbeddingCreateParams = {
            "input": "Hawaiian pizza",
            "model": "text-embedding-ada-002"
        }
        const result = await chat.embeddings.create(inputData)
        const embedding = result.data[0].embedding
        return embedding
    }



}