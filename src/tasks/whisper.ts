import { EmbeddingCreateParams } from 'openai/resources'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import OpenAI from 'openai'
import fs from "fs";

type WhisperData = TaskResponse & {


}

export class Whisper extends TaskBasic {

    constructor(name: string) {
        super(name)
    }


    async resolveTask({msg }: WhisperData): Promise<unknown> {
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        const fileName: string = msg.match(urlRegex) as any;     
        const openai = new OpenAI()
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream("./recource/mateusz.mp3"),
            model: "whisper-1",
          });
        return transcription.text
    }



}