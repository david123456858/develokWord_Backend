import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { estados } from './status'

@Entity()
export class equipos {
  @PrimaryColumn()
    id_equipo: string

  @Column()
    nombre_equipo: string

  @Column()
    descripcion: string

  // @ManyToOne(type => estados, (estado) => estado.equipos)
  //   estados: estados
}
