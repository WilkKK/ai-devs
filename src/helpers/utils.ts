import { ErrorHandler } from '../types/local'
import { AnswerResponse, TaskResponse } from '../types/remote'

export function handleError(error: ErrorHandler): void {
  console.error(`Error: ${error.response?.data?.msg || error.message}`)
}

export function showTaskDetails({ code, msg, ...rest }: TaskResponse): void {
  [`Task: ${msg}`, 'Data:', rest, '\n'].map((msg: string | object) => console.log(msg))
}

export function showAnswerResponse({ code, note, msg }: AnswerResponse): void {
  [`Answer code: ${code}`, `Answer note: ${note}`, `Answer message: ${msg}`].map((msg: string) => console.log(msg))
}

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}