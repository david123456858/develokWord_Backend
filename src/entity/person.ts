import { Entity,PrimaryColumn,Column } from "typeorm"
@Entity()
export abstract class person {
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
    
}