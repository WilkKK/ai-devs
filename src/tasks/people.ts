import { ChatOpenAI } from '@langchain/openai'
import { TaskResponse } from '../types/remote'
import { TaskBasic } from './taskBasic'
import OpenAI from 'openai'
import { HumanMessage, SystemMessage } from 'langchain/schema'
import * as qdrantService from '../services/qdrant'
import { QdrantItem } from '../types/local'
import * as langchainService from '../services/langchainService'
import { v4 } from 'uuid'

type PeopleData = TaskResponse & {
    question: string
}

type PersonPl = {
    imie: string
    nazwisko: string
    wiek: string
    o_mnie: string
    ulubiona_postac_z_kapitana_bomby: string
    ulubiony_serial: string
    ulubiony_film: string
    ulubiony_kolor: string
}
type Person = {
    name: string
    surname: string
    age: string
    aboutMe: string
    favoriteCharacter: string
    favoriteFilm: string
    favoriteSeries: string
    favoriteColor: string
}

type SearchItem = {
    payload: { content: string }
}

const COLLECTION_NAME = 'people'
const NEWS_URL = 'https://tasks.aidevs.pl/data/people.json'

export class People extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    private mapPesonPlToPerson(person: PersonPl): Person {
        return {
            name: person.imie,
            surname: person.nazwisko,
            age: person.wiek,
            aboutMe: person.o_mnie,
            favoriteCharacter: person.ulubiona_postac_z_kapitana_bomby,
            favoriteFilm: person.ulubiony_film,
            favoriteSeries: person.ulubiony_serial,
            favoriteColor: person.ulubiony_kolor
        }
    }
    private async getPeople() {
        const response = await fetch(NEWS_URL);
        return response.json();
    }


    private async prepareQdrantItems(news: Person[]): Promise<QdrantItem[]> {
        const prepareItem = async ({ name, surname, age, aboutMe, favoriteCharacter, favoriteFilm, favoriteSeries, favoriteColor }: Person): Promise<QdrantItem> => ({
            vector: await langchainService.getEmbedding(`${name}, ${surname}, ${age}, ${aboutMe}, ${favoriteCharacter}, ${favoriteFilm}, ${favoriteSeries}, ${favoriteColor}`),
            payload: {
                 content: name + " " + surname + " " + age + " " + aboutMe + " " +
                    favoriteCharacter + " " + favoriteFilm + " " + favoriteSeries + " " + favoriteColor
            },
            id: v4(),
        })
        return Promise.all(news.map(prepareItem))
    }

    async resolveTask({ msg, input, question }: PeopleData): Promise<unknown> {


        const client = qdrantService.createClient();

        if (!await qdrantService.isCollectionExists(client, COLLECTION_NAME)) {
            await qdrantService.createCollection(client, COLLECTION_NAME, true)
        }

        if (await qdrantService.isEmptyCollection(client, COLLECTION_NAME)) {
            const peoplePl = await this.getPeople() as PersonPl[];
            const people = peoplePl.map(item => this.mapPesonPlToPerson(item));
            const items = await this.prepareQdrantItems(people)
            await qdrantService.upsertItems(client, COLLECTION_NAME, items)
        }

        const queryEmbedding = await langchainService.getEmbedding(question)
        const response = await qdrantService.searchItem<SearchItem>(client, COLLECTION_NAME, queryEmbedding)
        const systemMessage = `
        ### Instructions:
        You have to answer the given question based on the context provided.
        The answer should be short, without additional information.
        ### Context:\n${response.payload.content}
    `
        const responsAi = langchainService.invoke(systemMessage, question)

        console.log(responsAi)
        return responsAi

    }



}