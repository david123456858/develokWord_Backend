import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { employes } from './employes'

@Entity()
export class estados {
  @PrimaryColumn()
    id_estado: string

  @Column()

    nombre_estado: string

  @OneToMany(type => employes, (usuario) => usuario.estado)
    usuario: employes[]// lista de empleados con ese estado
}
