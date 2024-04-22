import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import * as langchainService from '../services/langchainService'

type ToolData = TaskResponse & {
    question: string

}
export class Tool extends TaskBasic {

    constructor(name: string) {
        super(name)
    }
    async resolveTask({ question }: ToolData): Promise<unknown> {

        const response = "Today is 2024-04-09."
        const systemMessage = `
        ### Instructions:
        Decide whether the task should be added to the ToDo list or to the calendar.
        You have to answer the given question based on the context provided.
        Return JSON, For example for ToDo': 'Przypomnij mi, że mam kupić mleko = {"tool":"ToDo","desc":"Kup mleko" }',
        'example for Calendar': 'Jutro mam spotkanie z Marianem = {"tool":"Calendar","desc":"Spotkanie z Marianem","date":"2024-04-10"}

        ### Context:\n${response}
    `
        const responsAi = await langchainService.invoke(systemMessage, question)
        return JSON.parse(responsAi)

    }


}