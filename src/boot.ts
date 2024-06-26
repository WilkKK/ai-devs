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
import { Whoami } from './tasks/whoami'
import { Search } from './tasks/search'
import { People } from './tasks/people'
import { Knowledge } from './tasks/knowledge'
import { Tool } from './tasks/tools'
import { Gnome } from './tasks/gnome'
import { Ownapi } from './tasks/ownapi'
import { OwnapiPro } from './tasks/ownapipro'
import { Meme } from './tasks/meme'
import { Optimaldb } from './tasks/optimaldb'
import { Google } from './tasks/google'
import { Md2Html } from './tasks/md2html'

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
  // const task: TaskBasic = new Scraper("scraper")
  // const task: TaskBasic = new Whoami("whoami")
  // const task: TaskBasic = new Search("search")
  // const task: TaskBasic = new People("people")
  // const task: TaskBasic = new Knowledge("knowledge")
  // const task: TaskBasic = new Tool("tools")
  // const task: TaskBasic = new Gnome("gnome")
  // const task: TaskBasic = new Ownapi("ownapi")
  // const task: TaskBasic = new OwnapiPro("ownapipro")
  // const task: TaskBasic = new Meme("meme")
  // const task: TaskBasic = new Optimaldb("optimaldb")
  // const task: TaskBasic = new Google("google")
  const task: TaskBasic = new Md2Html("md2html")

  const token = await aiDevsService.getToken(task.taskName)
  // const taskData = await aiDevsService.getTaskWithParams(token, "question", "What is capital of Poland?") //liar
  const taskData = await aiDevsService.getTask(token)

  const answer = await task.resolveTask(taskData)
  await aiDevsService.sendAnswer(token, answer)
}

main()