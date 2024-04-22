import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import bodyParser from 'body-parser';
import express, { Request, Response, Express } from 'express';
import * as langchainService from '../services/langchainService'
import ngrok from '@ngrok/ngrok';
import { Model } from '../types/local';

type OwnapiData = TaskResponse & {}
const CONVERSATION_ENDPOINT = '/api/assistant/conversation'
var context: string[] = [];
export class OwnapiPro extends TaskBasic {
    session: any;

    constructor(name: string) {
        super(name);
        this.session = null;
        this.recogniseRequest = this.recogniseRequest.bind(this);
        this.catchConversation = this.catchConversation.bind(this);
    }

    async createApiServer(): Promise<string> {
        const app = await this.createExpressServer();
        if (this.session) {
            await this.session.disconnect();
            this.session = null;
        }
        return this.createNgrokServer(app);
    }

    async createExpressServer(): Promise<Express> {
        const app = express();
        app.use(bodyParser.json());
        app.post(CONVERSATION_ENDPOINT, this.recogniseRequest);
        return app;
    }

    async createNgrokServer(app: Express): Promise<string> {
        this.session = await new ngrok.SessionBuilder().authtokenFromEnv().connect();
        const listener = await this.session.httpEndpoint().listen();
        ngrok.listen(app as any, listener);
        return listener.url() || '';
    }

    async recogniseRequest(req: Request, res: Response): Promise<void> {
        const systemMessage = 'Is it question, please answer Yes or No';
        const response = await langchainService.invoke(systemMessage, req.body.question, {}, Model.GPT_4);
        if (response === "No") {
            context.push(req.body.question);
        }

        await this.catchConversation(req, res);
    }
    async catchConversation(req: Request, res: Response): Promise<void> {
        const systemMessage = `Please answer the question clearly about your experience and context, concisely, and in Polish. Use  ### Context:\n${context.join()}`;
        const response = await langchainService.invoke(systemMessage, req.body.question, {}, Model.GPT_4);
        res.send({ reply: response }).status(200);
    }

    async resolveTask({ msg }: OwnapiData): Promise<unknown> {
        if (this.session) {
            await this.session.disconnect();
            this.session = null;
        }
        const serverUrl = await this.createApiServer();
        return `${serverUrl}${CONVERSATION_ENDPOINT}`;
    }
}
