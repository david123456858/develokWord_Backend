import { BaseEntity, Column, OneToMany, PrimaryColumn } from 'typeorm'
import { ordenes } from './orders'

export class prioridades extends BaseEntity {
  @PrimaryColumn()
    id_proridades: string

  @Column()
    nombre_prioridad: string

//   @OneToMany(type => ordenes, (ordenes) => ordenes.prioridad)
//     orden: ordenes[]
}
