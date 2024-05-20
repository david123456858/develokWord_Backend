import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class equipos {
    @PrimaryColumn()
    id_equipo: string
    @Column()
    nombre_equipo: string
    id_estado: string
    @Column()
    description: string
    
}