import { person } from "../entity/person";
import { User } from "../entity/user";
import { Entity, Column, ManyToOne, PrimaryColumn, BaseEntity } from "typeorm";
import { estados } from "./status";
@Entity()
export class employes extends BaseEntity {
    @PrimaryColumn()
    id_usuario: String
    @Column()
    nombre1: string
    @Column()
    nombre2: string
    @Column()
    apellido1: string
    @Column()
    apellido2: string
    @Column()
    correo: string
    @Column()
    contraseña: string
    @Column()
    id_estado: string
    @Column()
    id_rol: string
}
