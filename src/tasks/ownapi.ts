import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import bodyParser from 'body-parser';
import express, { Request, Response, Express } from 'express';
import * as langchainService from '../services/langchainService'
import ngrok from '@ngrok/ngrok';
import { Model } from '../types/local';

type OwnapiData = TaskResponse & {}

const CONVERSATION_ENDPOINT = '/api/assistant/conversation'
export class Ownapi extends TaskBasic {

  constructor(name: string) {
    super(name)
  }
  async createApiServer(): Promise<string> {
    const app = await this.createExpressServer()
    return this.createNgrokServer(app)
  }

  async createExpressServer(): Promise<Express> {
    const app = express()
    app.use(bodyParser.json())
    app.post(CONVERSATION_ENDPOINT, this.assistantConversation)
    return app
  }

  async createNgrokServer(app: Express): Promise<string> {
    const session = await new ngrok.SessionBuilder().authtokenFromEnv().connect()
    const listener = await session.httpEndpoint().listen()
    ngrok.listen(app as any, listener)
    return listener.url() || ''
  }

  async assistantConversation(req: Request, res: Response): Promise<void> {
    const systemMessage = 'Answer the question very clearly, concise and in Polish. Retrun only answer without additional content.'
    const response = await langchainService.invoke(systemMessage, req.body.question, {}, Model.GPT_4)
    res.send({ reply: response }).status(200)
  }

  async resolveTask({ msg }: OwnapiData): Promise<unknown> {
    const serverUrl = await this.createApiServer()
    return `${serverUrl}${CONVERSATION_ENDPOINT}`
  }



}