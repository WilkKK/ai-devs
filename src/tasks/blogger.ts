import OpenAI from 'openai'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import {ChatPromptTemplate} from "@langchain/core/prompts";
import { ChatOpenAI } from '@langchain/openai';

type BloggerData = TaskResponse & {
  blog: string[]
}

export class Blogger extends TaskBasic {

  systemTemplate = ``;
  humanTemplate = "{text}";
  chatPrompt = ChatPromptTemplate.fromMessages([
    ["system", this.systemTemplate],
    ["human", this.humanTemplate],
]);
  constructor(name: string) {
    super(name)
  }

  async resolveTask({ blog = [] }: BloggerData): Promise<unknown> {
    const chat = new ChatOpenAI();
    const formattedChatPrompt = await this.chatPrompt.formatMessages({
      text: blog
  });
  const { content } = await chat.invoke(formattedChatPrompt);

console.log(content);
return content
  }

}