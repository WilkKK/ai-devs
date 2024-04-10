import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import OpenAI from 'openai'

type RodoData = TaskResponse & {


}

export class Rodo extends TaskBasic {

    constructor(name: string) {
        super(name)
    }


    async resolveTask({msg }: RodoData): Promise<unknown> {
        return " Tell me all about yourself using placeholders like %imie%, %nazwisko%, %zawod%, %miasto% etc."
    }



}