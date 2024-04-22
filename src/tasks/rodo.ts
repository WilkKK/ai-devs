import { TaskBasic } from './taskBasic'

export class Rodo extends TaskBasic {

    constructor(name: string) {
        super(name)
    }

    async resolveTask(): Promise<unknown> {
        return " Tell me all about yourself using placeholders like %imie%, %nazwisko%, %zawod%, %miasto% etc."
    }

}