import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class equipos {
  @PrimaryColumn()
    id_equipo: string

  @Column()
    nombre_equipo: string

  id_estado: strin
  description: string
}
