import OpenAI from 'openai'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from '@langchain/openai';
import * as aiDevsService from '../services/ai-devs'
import { delay } from '../helpers/utils';
import {HumanMessage, SystemMessage} from "langchain/schema";

type WhoamiData = TaskResponse & {
    hint: string;
}

export class Whoami extends TaskBasic {

    hints: string = "";
    counter: number = 0;
    systemTemplate = `Please tell me what peson I will ask. Please give me answer if you are sure. If you are not sure please say 'I need more details.' give me only name and surname`;
    chatPrompt = ChatPromptTemplate.fromMessages([
        ["system", this.systemTemplate],
    ]);
    constructor(name: string) {
        super(name)
    }

    private async giveMeHint(): Promise<string>{
        const token = await aiDevsService.getToken("whoami")
        const result = await aiDevsService.getTask(token);
        return result.hint as string
    }

    private async getAnswer(): Promise<string> {
        await delay(2000);
        this.hints = this.hints + " " + await this.giveMeHint();
        const chat = new ChatOpenAI();
        const { content } = await chat.call([
            new SystemMessage(`
            Please tell me what peson I will ask. Please give me answer if you are sure. If you are not sure please say 'I need more details.' give me only name and surname
            `),
            new HumanMessage(this.hints),
        ]);
        this.counter++;
        console.log("hints = " + this.hints);
        console.log(content);
        return content as string;
    }
    async resolveTask({ hint = "" }: WhoamiData): Promise<unknown> {
        this.hints = hint
        const chat = new ChatOpenAI();
        const formattedChatPrompt = await this.chatPrompt.formatMessages({
            answer: this.hints,
        });
        const { content } = await chat.invoke(formattedChatPrompt);
        let result = content as string;
        this.counter++;
        console.log(result);
        while (result.toLowerCase() === "i need more details." && this.counter < 8) {
            result = await this.getAnswer();
        }
     
        console.log("RESULT: " + result)
       
        return result
    }

}