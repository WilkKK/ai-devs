import axios from 'axios'
import { AnswerResponse, TaskResponse, TokenResponse } from '../types/remote'

export async function getToken(task: string): Promise<string> {
  const { data: { token } } = await axios.post<TokenResponse>(
    `${process.env.AI_DEVS_API_URL}/token/${task}`, { apikey: process.env.AI_DEVS_API_KEY }
  )
  return token
}

export async function getTask(token: string): Promise<TaskResponse> {
  const { data } = await axios.get<TaskResponse>(`${process.env.AI_DEVS_API_URL}/task/${token}`)
  console.log(data)
  return data
}

export async function getTaskWithParams(token: string, formDataName: string, formDataValue: string): Promise<TaskResponse> {
  let bodyFormData = new FormData();
  bodyFormData.append(formDataName, formDataValue);
  const { data } = await axios({
    method: "post",
    url: `${process.env.AI_DEVS_API_URL}/task/${token}`,
    data: bodyFormData
  })
  return data
}

export async function sendAnswer(token: string, answer: unknown): Promise<AnswerResponse> {
  console.log("answer to send  = " + answer)
  const { data } = await axios.post(`${process.env.AI_DEVS_API_URL}/answer/${token}`, { answer })
  console.log(data);
  return data

}

