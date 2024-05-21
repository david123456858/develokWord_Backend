import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm"

@Entity()
class ordenes {
    @PrimaryColumn()
    id_orden: string
    @Column()
    comentarios: string
    @Column()
    nombre_usuario: string
    @CreateDateColumn()
    fecha_finalizacion: Date
    //llaves foreaneas
    id_prioridad: string
    id_equipo: string


}