import { createApiServer } from '../services/server'
import { TaskResponse } from '../types/remote'
import { Request, Response } from 'express'
import axios from 'axios'
import { TaskBasic } from './taskBasic'

const ENDPOINT = '/api/assistant/conversation'

type GoogleData = TaskResponse & {
    question: string
}


export class Google extends TaskBasic {

    constructor(name: string) {
        super(name)
        this.assistantConversation = this.assistantConversation.bind(this);
        this.fetchSiteUrl = this.fetchSiteUrl.bind(this);
    }

    async resolveTask({ msg, input, question }: GoogleData): Promise<unknown> {

        const { url, server } = await createApiServer()

        server.post(ENDPOINT, this.assistantConversation)
        return `${url}${ENDPOINT}`

    }

    async assistantConversation(req: Request, res: Response): Promise<void> {
        const response = await this.fetchSiteUrl(req.body.question)
        res.send({ reply: response }).status(200)
    }

    async fetchSiteUrl(q: string): Promise<string> {
        const params = { q, engine: 'google', api_key: process.env.SERPAPI_API_KEY }
        const response = await axios(process.env.SERPAPI_API_URL || '', { params })
        const url = response.data.organic_results[0].link
        if (!url) {
            throw new Error(`Not found url for ${q}. Try again!`)
        }
        return url
    }

}