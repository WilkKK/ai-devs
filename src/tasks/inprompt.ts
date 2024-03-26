import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from '@langchain/openai';
import {HumanMessage, SystemMessage} from "langchain/schema";


type InpromptData = TaskResponse & {
    input: string[],
    question: string

}

export class Inprompt extends TaskBasic {

    systemTemplate = `Return only name from question`;
    humanTemplate = "{text}";
    chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", this.systemTemplate],
        ["human", this.humanTemplate],
    ]);


    constructor(name: string) {
        super(name)
    }


    async resolveTask({ input = [], question }: InpromptData): Promise<unknown> {
        const contentItems = await this.getContent(input, question);
        const chat = new ChatOpenAI();
        const { content } = await chat.invoke([
            new SystemMessage(`
                Answer questions as truthfully using the context below and nothing more. If you don't know the answer, say "don't know".
                context###${contentItems}###
            `),
            new HumanMessage(
                question
            ),
        ]);
        console.log(content)
        return content
    }

    private async getContent(input: string[], question: string) : Promise<string[]>{
        console.log(question);
        const chat = new ChatOpenAI();
        const formattedChatPrompt = await this.chatPrompt.formatMessages({
            text: question
        });
        const { content } = await chat.invoke(formattedChatPrompt);
        const regex = new RegExp(`\\b${content}\\b`, "i");
        const inputConnectWithNameList = input.filter(sentence => sentence.match(regex));
        return inputConnectWithNameList;
    }

}