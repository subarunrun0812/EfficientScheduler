import { v4 as uuidv4 } from 'uuid'

export class User {
  readonly id: string = uuidv4()

  constructor(readonly name: string) {}
}
