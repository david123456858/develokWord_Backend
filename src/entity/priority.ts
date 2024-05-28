import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { ordenes } from './orders'
@Entity()
export class prioridades extends BaseEntity {
  @PrimaryColumn()
    id_proridades: string

  @Column()
    nombre_prioridad: string

  @OneToMany(type => ordenes, (orden) => orden.prioridades)
    ordenes: ordenes
}
