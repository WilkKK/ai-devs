import OpenAI from 'openai'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'

type ModerationData = TaskResponse & {
  input: string[]
}

export class Moderation extends TaskBasic {

  constructor(name: string){
    super(name)
  }

  async resolveTask({ input = [] }: ModerationData): Promise<unknown> {
  const openai = new OpenAI()
  const { results } = await openai.moderations.create({ input })
  return results.map(({ flagged }: { flagged: boolean }) => flagged ? 1 : 0)
  }

}