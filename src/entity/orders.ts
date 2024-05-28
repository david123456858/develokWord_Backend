import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { prioridades } from './priority'
import { equipos } from './teams'
import { employes } from './employes'

@Entity()
export class ordenes extends BaseEntity {
  @PrimaryColumn()
    id_orden: string

  @Column()
    comentarios: string

  @Column()
    fecha_inicio: Date

  @Column()
    fecha_finalizacion: Date

  @ManyToOne(type => employes, (empleado) => empleado)
    usuario: employes

  @ManyToOne(type => equipos, (equipo) => equipo.orden)
    equipo: equipos

  @ManyToOne(type => prioridades, (prioridades) => prioridades.ordenes)
    prioridades: prioridades
}
