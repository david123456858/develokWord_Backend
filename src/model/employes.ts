import { person } from "./person";
import { User } from "./user";

export class employes extends person {
    public estado: string
    public rol: string
    public correo: string
    public contra: string
    constructor(id_user: String, nombre1: string, nombre2: string, apellido1: string, apellido2: string,
        estado: string, rol: string, correo: string, contra: string) {
        super(id_user, nombre1, nombre2, apellido1, apellido2)
        this.correo = correo
        this.contra = contra
        this.estado = estado
        this.rol = rol
    }
}
