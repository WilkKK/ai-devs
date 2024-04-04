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


    

        // var urlRegex = /(https?:\/\/[^\s]+)/g;
        // const fileName: string = msg.match(urlRegex) as any;     
        // const openai = new OpenAI()
        // const transcription = await openai.audio.transcriptions.create({
        //     file: fs.createReadStream("./recource/mateusz.mp3"),
        //     model: "whisper-1",
        //   });
        return " Tell me all about yourself using placeholders like %imie%, %nazwisko%, %zawod%, %miasto% etc."
    }



}