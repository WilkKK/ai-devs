import * as renderFromService from '../services/render-form'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'

type MemeDate = TaskResponse & { image: string, text: string }

export class Meme extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    async resolveTask({ text, image }: MemeDate): Promise<unknown> {
        const { success, href } = await renderFromService.generateImage({ 'name.text': text, 'image.src': image })
        if (!success || !href) {
            throw new Error('Error occurred during image generation. Try again!')
        }
        return href
    }

}

