import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { estados } from './status'
import { employes } from './employes'

@Entity()
export class equipos extends BaseEntity {
  @PrimaryColumn()
    id_equipo: string

  @Column()
    nombre_equipo: string

  @Column()
    descripcion: string

  @ManyToOne(type => estados, (estado) => estado.equipos)
    estados: estados

  @OneToMany(type => employes, (empleado) => empleado.idEquipo)
    empleado: employes[]
}
