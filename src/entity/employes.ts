import { person } from "../entity/person";
import { User } from "../entity/user";
import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
export class employes extends person {
    @Column()
    public estado: string
    @Column()
    public rol: string
    @Column()
    public correo: string
    @Column()
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
