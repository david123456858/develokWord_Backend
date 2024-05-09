export abstract class person {
    id_user: String
    nombre1: string
    nombre2: string
    apellido1: string
    apellido2: string
    constructor(id_user: String,nombre1: string,nombre2: string,apellido1: string,apellido2: string) {
        this.id_user = id_user
        this.nombre1 = nombre1
        this.nombre2 = nombre2
        this.apellido1 = apellido1
        this.apellido2 = apellido2
    }
}