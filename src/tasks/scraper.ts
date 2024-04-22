import { ChatOpenAI } from '@langchain/openai'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import { HumanMessage, SystemMessage } from 'langchain/schema'

type ScraperData = TaskResponse & {
    question: string,
    input: string

}

export class Scraper extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    async resolveTask({ input, question }: ScraperData): Promise<unknown> {
        const chatDefault = new ChatOpenAI({
            modelName: 'gpt-3.5-turbo'
        });

        const system = `For this article context###${input}###, answer the question ask by user in maximum 15 worlds`;
        let result
        try {
            result = await chatDefault.call([
                new SystemMessage(system),
                new HumanMessage(question),
            ]);
        } catch (e) {
            console.log(e)

        }

        return result?.content
    }

}