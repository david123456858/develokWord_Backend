import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { employes } from './employes'
@Entity()
export class roles {
  @PrimaryColumn()
    id_rol: string

  @Column()
    nombre_rol: string

  @ManyToOne(type => employes, (usuarios) => usuarios.rol)
    usuarios: employes[]
}
