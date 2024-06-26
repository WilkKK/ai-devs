import { Express } from 'express'

export type TasksConfig = {
  [key: string]: (data: any) => Promise<unknown>
}

export type ErrorHandler = {
  response?: { data?: { msg: string }}
  message?: string
}

export type QdrantItem = {
  id: string
  payload: Record<string, string>
  vector: number[]
}

export enum Model {
  GPT_4 = 'gpt-4',
  GPT_3_5_TURBO = 'gpt-3.5-turbo',
  GPT_4_TURBO_PREVIEW = 'gpt-4-turbo-preview',
  TEXT_EMBEDDING_3_SMALL = 'text-embedding-3-small',
  TEXT_EMBEDDING_ADA_002 = 'text-embedding-ada-002',
  WHISPER_1 = 'whisper-1',
}

export type Server = {
  server: Express
  url: string
}