export class User {
  user: String
  rol: String

  constructor (user: String, passWords: String) {
    this.user = user
    this.rol = passWords
  }
}
