import { person } from "../entity/person";
import { User } from "../entity/user";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { estados } from "./status";
export class employes extends person {
    @Column()
    public id_estado: string
    @Column()
    public id_rol: string
    @Column()
    public correo: string
    @Column()
    public contraseña: string
    
    
}
