export type TokenResponse = {
  token: string
}

export type TaskResponse = {
  code: number
  msg: string
  [key: string]: unknown
}

export type AnswerResponse = {
  code: number
  msg: string
  note: string
}

export type RenderFormResponse = {
  success: boolean
  requestId?: string
  href?: string
}