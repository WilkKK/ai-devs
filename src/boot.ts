import dotenv from 'dotenv'
import { handleError, showTaskDetails, showAnswerResponse } from './helpers/utils'
import * as aiDevsService from './services/ai-devs'
import { HelloApi } from './tasks/helloapi'
import { TaskBasic } from './tasks/taskBasic'
import { Moderation } from './tasks/moderation'
import { Blogger } from './tasks/blogger'
import { Liar } from './tasks/lier'
import { Inprompt } from './tasks/inprompt'
import { Embedding } from './tasks/embedding'
import { Whisper } from './tasks/whisper'
import { Funtion } from './tasks/functions'
import { Rodo } from './tasks/rodo'
import { Scraper } from './tasks/scraper'

dotenv.config({ path: './.env' })
process.on('unhandledRejection', handleError)

async function main() {


  //task 01 - helloapi
  // const task: TaskBasic = new HelloApi("helloapi")
  // const task: TaskBasic = new Moderation("moderation")
  // const task: TaskBasic = new Blogger("blogger")
  // const task: TaskBasic = new Liar("liar")
  //  const task: TaskBasic = new Inprompt("inprompt")
    // const task: TaskBasic = new Embedding("embedding")
    // const task: TaskBasic = new Whisper("whisper")
    // const task: TaskBasic = new Funtion("functions")
    // const task: TaskBasic = new Rodo("rodo")
    const task: TaskBasic = new Scraper("scraper")

  const token = await aiDevsService.getToken(task.taskName)
  // const taskData = await aiDevsService.getTaskWithParams(token, "question", "What is capital of Poland?") //liar
  const taskData = await aiDevsService.getTask(token)

  const answer = await task.resolveTask(taskData)
  const answerResponse = await aiDevsService.sendAnswer(token, answer)
}


main()