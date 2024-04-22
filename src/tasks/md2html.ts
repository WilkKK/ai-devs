import OpenAI from "openai";
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'

type Md2HtmlDate = { input: string } & TaskResponse

export class Md2Html extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    async resolveTask({ input }: Md2HtmlDate): Promise<unknown> {
        const openai = new OpenAI();
        const response = await openai.chat.completions.create({
            model: "ft:gpt-3.5-turbo-.....",
            messages: [
                { "role": "system", "content": "md2html, convert text, rememeber _text_ it is <u>text</u> and **pogrubienie** = <span class='bold'>pogrubienie</span>" },
                { "role": "user", "content": input },
            ]
        });

        const result = response.choices[0].message.content;
        return result
    }

}

