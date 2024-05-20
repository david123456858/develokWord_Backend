import { Column, Entity, PrimaryColumn } from "typeorm"
@Entity()
export class roles{
    @PrimaryColumn()
    id_rol:string
    @Column()
    nombre_rol:string

    
}