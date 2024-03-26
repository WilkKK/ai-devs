import OpenAI from 'openai'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import {ChatPromptTemplate} from "@langchain/core/prompts";
import { ChatOpenAI } from '@langchain/openai';

type LiarData = TaskResponse & {
  blog: string[]
}

export class Liar extends TaskBasic {

  systemTemplate = `I have question What is capital of Poland? Answer is {answer}. Return YES if it is answer for question in other case return NO`;
  humanTemplate = "Is there an answer to the question asked?";
  chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", this.systemTemplate],
]);
  constructor(name: string) {
    super(name)
  }

  async resolveTask({ answer = ""}: LiarData): Promise<unknown> {
    const chat = new ChatOpenAI();
    const formattedChatPrompt = await this.chatPrompt.formatMessages({
        answer: answer,
    });
  const { content } = await chat.invoke(formattedChatPrompt);

console.log(content);
return content
  }

}