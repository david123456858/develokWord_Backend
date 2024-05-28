import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { prioridades } from './priority'
import { equipos } from './teams'

@Entity()
export class ordenes extends BaseEntity {
  @PrimaryColumn()
    id_orden: string

  @Column()
    comentarios: string

  @Column()
    nombre_usuario: string

  @Column()
    fecha_finalizacion: Date

  // @ManyToOne(type => prioridades, (prioridad) => prioridad.orden)
  //   prioridad: prioridades

  @ManyToOne(type => equipos, (equipo) => equipo.orden)
    equipo: equipos
}
