import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import OpenAI from "openai";

type GnomeData = TaskResponse & {
  url: string
}

export class Gnome extends TaskBasic {

  constructor(name: string) {
    super(name)
  }

  private async getImage(url: string): Promise<any> {
    const openai = new OpenAI();
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: 'I will give you a drawing of a gnome with a hat on his head. Tell me what is the color of the hat in POLISH. The answer should be short, without additional information. If any errors occur, return "ERROR" as answer' },
            {
              type: "image_url",
              image_url: {
                "url": url,
              },
            },
          ],
        },
      ],
    });
    return response.choices[0].message.content;
  }
  async resolveTask({ url }: GnomeData): Promise<unknown> {

    const response = await this.getImage(url);
    return response

  }


}