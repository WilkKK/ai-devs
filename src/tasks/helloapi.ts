import { TaskResponse } from "../types/remote"
import { TaskBasic } from "./taskBasic"


type HelloApiData = TaskResponse & {
  cookie: string
}

export class HelloApi extends TaskBasic {

  constructor(name: string){
    super(name)
  }

  async resolveTask({ cookie }: HelloApiData): Promise<unknown> {
    return cookie
  }

}